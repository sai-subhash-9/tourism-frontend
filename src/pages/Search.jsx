import React, { useEffect, useState } from "react";
import PackageCard from "./PackageCard";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const term = urlParams.get("searchTerm") || "";
    setSearchTerm(term);

    if (!term.trim()) return;
    fetchSearchResults(term);
  }, [location.search]);

  const fetchSearchResults = async (term) => {
    try {
      setLoading(true);
      const base =
        import.meta.env.VITE_BACKEND_URL ||
        "http://localhost:5000/api/v1/tourism";

      // Try searching both states and places
      const [stateRes, placeRes] = await Promise.all([
        axios.get(`${base}/states?search=${term}`),
        axios.get(`${base}/places?search=${term}`),
      ]);

      const combined = [
        ...(stateRes.data?.data || []),
        ...(placeRes.data?.data || []),
      ];

      setResults(combined);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-white underline">
        Search Results
      </h1>

      {loading && (
        <p className="text-white text-center text-lg">Searching...</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-white text-center text-lg">
          No results found for “{searchTerm}”
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
          {results.map((item, i) => (
            <PackageCard
              key={i}
              packageData={item}
              type={item.stateSlug ? "place" : "state"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
