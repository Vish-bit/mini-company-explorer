import React, { useState } from "react";
import Search from "./assets/search.png";

const App = () => {
  const [data, setData] = useState();
  const [query, setQuery] = useState("");

  const handleSearch = () => {

  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex gap-2 mb-4 relative pt-6">
        <img src={Search} alt="Search" className="absolute w-7 top-8 left-3"/>
        <input
          type="text"
          placeholder="Search companies..."
          className="flex-1 p-2 pl-12 border border-gray-300 focus:outline-none rounded-lg focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default App;
