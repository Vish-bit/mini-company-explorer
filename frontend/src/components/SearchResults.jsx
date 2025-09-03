import { useNavigate } from "react-router-dom";
import CompanyIcon from "../assets/company-placeholder.svg";

const SearchResults = ({ loading, result, query, searched }) => {
  const navigate = useNavigate();

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;

  if (!loading && query && result.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        No results found for <span className="font-semibold">"{query}"</span>
      </p>
    );
  }

  return (
    <>
      <ul className="space-y-2">
        {result.map((company) => (
          <li
            key={company.id}
            onClick={() => navigate(`/company/${company.id}`)}
            className="p-3 flex justify-between items-center border border-gray-700 
                     rounded-lg cursor-pointer hover:bg-gray-800 transition"
          >
            <p className="font-medium text-gray-200">{company.name}</p>
            <p className="text-sm text-gray-400">{company.industry}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
