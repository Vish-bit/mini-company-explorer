import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BackIcon from "../assets/back.png";
import CompanyDetailIcon from "../assets/company-detail-icon.svg";
import MapIcon from "../assets/map.png";

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
    <div className="max-w-lg mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow border border-gray-700 text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-purple-400">{company.name}</h2>
      <div className="space-y-2 text-gray-300">
        <p><span className="font-semibold text-gray-400">Location:</span> {company.location || "N/A"}</p>
        <p><span className="font-semibold text-gray-400">Industry:</span> {company.industry}</p>
        <p><span className="font-semibold text-gray-400">Employees:</span> {company.employees || "N/A"}</p>
      </div>
    </div>
  );
}

export default DetailPage;
