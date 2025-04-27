
from groq import Groq
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Allow all origins for development
CORS(app, resources={r"/api/*": {"origins": "*"}})
history = dict()

# Route now uses /api/getPeople to match the frontend
@app.route("/api/getPeople", methods=["GET"])
def getPeople():
    locationFilter = request.args.get("loc") or ""
    keywordFilter = request.args.get("keys") or ""
    aluminiFilter = request.args.get("alum") or ""

    # Replace with your real API keys
    GROQ_API_KEY = "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"
    LINKD_API_KEY = "lk_c32bed2cd3d54b7b8629cce26c1bfb78"

    # Step 1: Get the query sentence using Groq
    try:
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
            params["school"] = aluminiFilter

        # Step 3: Make GET request with query parameters
        response = requests.get(url, headers=headers, params=params)

        # Check if API request was successful
        if not response.ok:
            return jsonify({
                "error": f"API error: {response.status_code}",
                "message": response.text
            }), response.status_code
        
        # Try to parse response as JSON
        try:
            result = response.json()
            history[query] = result
            return jsonify({"response": result})
        except ValueError:
            return jsonify({"error": "Invalid JSON response", "response": response.text}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route now uses /api/getHistory to match the frontend
@app.route("/api/getHistory", methods=["GET"])
def getHistory():
    successfulResponses = []
    for query, result in history.items():
        sub = {"query": query, "result": result}
        successfulResponses.append(sub)
    return jsonify(successfulResponses)

# Add a simple health check endpoint
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    # Run on 0.0.0.0 to be accessible from outside the container
    app.run(host="0.0.0.0", port=5000, debug=True)
