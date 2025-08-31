import React from "react";

const SearchResults = ({ loading, result, query }) => {
    
  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && result.length === 0 && query === "" && (
        <p className="text-gray-500 text-center mt-10">
          <em>"Start by searching for a company above"</em>
        </p>
      )}

      {!loading && result.length === 0 && query && <p>No result found.</p>}

      {!loading && result.length > 0 && (
        <ul>
          {result.map((company) => (
            <li key={company.id}>
              <h2>{company.name}</h2>
              <p>{company.industry}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchResults;
