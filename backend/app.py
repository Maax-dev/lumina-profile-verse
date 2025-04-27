from groq import Groq
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/": {"origins": ""}}, supports_credentials=True)
history=dict()

@app.route("/getPeople", methods=["GET"])
def getPeople():
    locationFilter = request.args.get("loc") or ""
    keywordFilter = request.args.get("keys") or ""
    aluminiFilter = request.args.get("alum") or ""

    # Replace with your real API keys
    GROQ_API_KEY = "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"
    LINKD_API_KEY = "lk_c32bed2cd3d54b7b8629cce26c1bfb78"

    # Step 1: Get the query sentence using Groq
    client = Groq(api_key=GROQ_API_KEY)

    completion = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {
                "role": "user",
                "content": (
                    f"Write a natural language search query for people based on: "
                    f"location '{locationFilter}', keyword '{keywordFilter}', alumni of '{aluminiFilter}'. "
                    f"Output only the search query."
                )
            }
        ],
        temperature=0.7,
        max_tokens=512,
        top_p=1,
        stream=False,
    )

    query = completion.choices[0].message.content.strip()

    if not query:
        return jsonify({"error": "Generated query is empty"}), 400

    # Step 2: Prepare GET request
    url = "https://search.linkd.inc/api/search/users"

    headers = {
        "Authorization": f"Bearer {LINKD_API_KEY}",
        "Content-Type": "application/json",
    }

    params = {
        "query": query,
        "limit": 20,  # You can also make this dynamic if needed
    }

    if aluminiFilter:
        params["school"] = aluminiFilter  # or params["school"] = [aluminiFilter] depending on API handling


    # Step 3: Make GET request with query parameters
    response = requests.get(url, headers=headers, params=params)

    print(history)
    try:
        history[query] = response.json()
        return jsonify({"response": response.json()})
    except ValueError:
        return jsonify({"response": response.text})

@app.route("/getHistory", methods=["GET"])
def getHistory():
    successfulResponses = []
    for query, result in history.items():
        sub = {"query": query, "result": result}
        successfulResponses.append(sub)
    return jsonify(successfulResponses)

if __name__ == "__main__":
    app.run(debug=True)