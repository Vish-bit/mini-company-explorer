import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/companies/${id}`);
        if (!res.ok) throw new Error("Failed to fetch company details");
        const data = await res.json();
        setCompany(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading)
    return <p className="text-gray-00 text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!company)
    return <p className="text-gray-00 text-center mt-10">No company found</p>;

  return (
    <div className="h-screen p-4">
      <Link to="/">
        <p className="text-gray-400 hover:text-gray-200">{"< "}Back</p>
      </Link>
      <div className="flex items-center justify-center bg-[oklch(0.15 0.05 247.52)]">
        <div className="w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg shadow-[#581f6761] border border-gray-700 text-gray-200">
          <p className="text-3xl font-bold mb-4 text-gray-200 py-4">
            {company.name}
          </p>
          <div className="space-y-2 text-gray-300">
            <p className="text-xl border-t border-gray-500 py-4">
              <span className=" text-gray-200 ">Location : </span>
              {company.location || "N/A"}
            </p>
            <p className="text-xl border-t border-gray-500 py-4">
              <span className=" text-gray-200 ">Industry : </span>
              {company.industry}
            </p>
            <p className="text-xl border-t border-gray-500 py-4">
              <span className=" text-gray-200 ">Employees : </span>
              {company.employees || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
