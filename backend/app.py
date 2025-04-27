from groq import Groq
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

history = dict()

@app.route("/getPeopleByNLP", methods=["GET"])
def getPeopleByNLP():
    statement = request.args.get("statement") or ""
    GROQ_API_KEY = "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"
    LINKD_API_KEY = "lk_c32bed2cd3d54b7b8629cce26c1bfb78"

    client = Groq(api_key=GROQ_API_KEY)
    completion = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[{"role": "user", "content": f"Write a short natural language search query for '{statement}'"}],
        temperature=0.7,
        max_tokens=512,
        top_p=1,
        stream=False,
    )

    query = completion.choices[0].message.content.strip()
    if not query:
        return jsonify({"error": "Generated query is empty"}), 400

    url = "https://search.linkd.inc/api/search/users"
    headers = {
        "Authorization": f"Bearer {LINKD_API_KEY}",
        "Content-Type": "application/json",
    }
    params = {
        "query": query,
        "limit": 20,
    }

    response = requests.get(url, headers=headers, params=params)

    print(history)
    try:
        history[query] = response.json()
        return jsonify({"response": response.json()})
    except ValueError:
        return jsonify({"response": response.text})
    
    

@app.route("/getPeople", methods=["GET"])
def getPeople():
    locationFilter = request.args.get("loc") or ""
    keywordFilter = request.args.get("keys") or ""
    aluminiFilter = request.args.get("alum") or ""

    GROQ_API_KEY = "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"
    LINKD_API_KEY = "lk_e653221e402747fcb1293b61a1468066"

    client = Groq(api_key=GROQ_API_KEY)
    completion = client.chat.completions.create(
        model="meta-llama/llama-4-scout-17b-16e-instruct",
        messages=[
            {"role": "user", "content": f"Write a natural language search query for people based on: location '{locationFilter}', keyword '{keywordFilter}', alumni of '{aluminiFilter}'. Output only the search query."}
        ],
        temperature=0.7,
        max_tokens=512,
        top_p=1,
        stream=False,
    )

    query = completion.choices[0].message.content.strip()
    if not query:
        return jsonify({"error": "Generated query is empty"}), 400

    url = "https://search.linkd.inc/api/search/users"
    headers = {
        "Authorization": f"Bearer {LINKD_API_KEY}",
        "Content-Type": "application/json",
    }

    params = {
        "query": query,
        "limit": 20,
    }

    if aluminiFilter:
        params["school"] = aluminiFilter

    response = requests.get(url, headers=headers, params=params)

    try:
        data = response.json()
        history[query] = {
            "results": data.get('results', []),
            "total": data.get('total', len(data.get('results', []))),
            "query": query,
            "endpoint_used": "/getPeople"
        }
        return jsonify({"response": data})
    except ValueError:
        return jsonify({"response": response.text})

@app.route("/getHistory", methods=["GET"])
def getHistory():
    successfulResponses = []
    for query, result in history.items():
        sub = {
            "query": result.get("query", ""),
            "total": result.get("total", 0),
            "source": result.get("endpoint_used", "/getPeople"),  # ✅ important!
            "result": result.get("results", [])  # ✅ full list of alumni
        }
        successfulResponses.append(sub)
    return jsonify(successfulResponses)


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
