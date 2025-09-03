import { useNavigate } from "react-router-dom";
import View from "../assets/view.png";

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
            className="p-3 flex justify-between items-center border-1 border-gray-700 
                     rounded-lg cursor-pointer text-gray-400 hover:bg-[#da89ff1f] hover:border-gray-400 hover:text-white transition"
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-lg">{company.name}</p>
                <p className="text-sm">{company.industry}</p>
              </div>
              <img src={View} alt="View" className="text-white view-icon"/>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchResults;
