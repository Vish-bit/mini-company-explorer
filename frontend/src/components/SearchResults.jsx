import React from "react";
import { useNavigate } from "react-router-dom";


const SearchResults = ({ loading, result, query, searched }) => {
  const navigate = useNavigate();
  
  return (
    <>
      {loading && (
        <p className="text-gray-00 text-center mt-10 animate-plus">
          Loading...
        </p>
      )}

      {!loading && result.length === 0 && query === "" && (
        <p className="text-gray-00 text-center mt-10">
          <em>"Start by searching for a company above"</em>
        </p>
      )}

      {!loading && searched && result.length === 0 && (
        <p className="text-gray-00 text-center mt-10">
          No results found for <span className="font-semibold">"{query}"</span>
        </p>
      )}

      {!loading && searched && result.length > 0 && (
        <ul className="space-y-3">
          {result.map((company) => (
            <li
              key={company.id}
              className="p-4 border border-0 rounded-md shadow-sm hover:shadow-md transition cursor-pointer bg-white"
            >
              <div className="flex justify-between align-center">
                <div className="flex items-center gap-4">
                  <img
                    src="src/assets/company-placeholder.png"
                    alt=""
                    width="42"
                  />
                  <div className="flex flex-col items-start justify-centr">
                    <p className="font-semibold text-md text-gray-800">
                      {company.name}
                    </p>
                    <p className="text-sm text-md text-gray-600">
                      {company.industry}
                    </p>
                  </div>
                </div>
                <button type="button" className="text-md text-blue-600 bg-white" onClick={navigate("/detail")}>View</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchResults;
