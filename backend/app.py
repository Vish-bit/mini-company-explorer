from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

with open("companies.json") as f:
    companies = json.load(f)

@app.route("/api/companies")
def search_companies():
    q = request.args.get("q", "").lower()
    results = [
        {"id": c["id"], "name": c["name"], "industry": c["industry"]}
        for c in companies
        if q in c["name"].lower()
    ]
    return jsonify(results)

@app.route("/api/companies/<company_id>")
def get_company(company_id):
    for c in companies:
        if c["id"] == company_id:
            return jsonify(c)
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
