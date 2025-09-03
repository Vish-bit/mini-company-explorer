import React, { useState, useEffect } from "react";
import Search from "../assets/search-icon.png";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  // const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResult([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/companies?q=${query}`
        );
        if (!res.ok) throw new Error("Error fetching results");
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error(err);
        setResult([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce search (400ms delay)

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto mt-10 text-gray-200">
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-gray-600">
          <img src={Search} alt="Search" width={32}/>
        </span>
        <input
          type="text"
          value={query}
          placeholder="Search companies..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-12 py-3 rounded-lg border-2 border-gray-700 
                     bg-gray-900 text-gray-100 placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-600 text-lg search-input"
        />
      </div>

      <SearchResults loading={loading} result={result} query={query} />
    </div>
  );
};

export default SearchPage;
