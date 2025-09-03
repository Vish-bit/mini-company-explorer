import React, { useState, useEffect } from "react";
import Search from "../assets/search.png";
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
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={Search} alt="Search" width={28}/>
        </span>
        <input
          type="text"
          value={query}
          placeholder="Search companies..."
          onChange={(e) => setQuery(e.target.value)}
          className="neon-input
              w-full px-12 py-3 rounded-lg text-lg
              bg-transparent text-gray-100 placeholder-gray-400
              border-2 border-[#9700bd]/70 focus:border-[#dc50ff]
              focus:ring-4 focus:ring-[#9700bd]/45 outline-none"
        />
      </div>

      <SearchResults loading={loading} result={result} query={query} />
    </div>
  );
};

export default SearchPage;
