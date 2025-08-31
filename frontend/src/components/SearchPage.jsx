import React, { useEffect, useState } from "react";
import Search from "../assets/search.png";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`http://127.0.0.1:5000/api/companies?q=${query}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResults(data);
    } 
    catch (err) {
      console.log("Error fetching companies", err);
    }
    finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      <div className="flex gap-2 mb-4 pt-6 ">
        <div className="w-full relative">
          <img
            src={Search}
            alt="Search"
            className="absolute w-7 top-3 left-3"
          />
          <input
            type="text"
            placeholder="Search companies..."
            className="flex-1 w-full px-12 py-3 border-2 border-gray-300 focus:outline-none rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} className="btn-grad">
          Search
        </button>
      </div>

      <SearchResults loading={loading} result={result} query={query} />

    </div>
  );
};

export default SearchPage;
