import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css"; // ✅ exact same styles
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import PackageCard from "./PackageCard"; // ✅ adjust path if needed

const PlacesList = () => {
  const { stateSlug } = useParams();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [stateName, setStateName] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ fetch places for selected state
  const fetchPlaces = useCallback(async () => {
    try {
      setLoading(true);
      const base =
        import.meta.env.VITE_BACKEND_URL ||
        "http://localhost:5000/api/v1/tourism";
      const res = await axios.get(`${base}/states/${stateSlug}/places`);
      if (res.data?.success) {
        const data = res.data.data || [];
        setPlaces(data);
        if (data.length > 0 && data[0].state?.name)
          setStateName(data[0].state.name);
      } else {
        setPlaces([]);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching places:", err);
      setPlaces([]);
      setLoading(false);
    }
  }, [stateSlug]);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        {/* ✅ Same background section */}
        <div className="backaground_image w-full"></div>

        {/* ✅ Hero section identical to Home */}
        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            {stateName ? `Places in ${stateName}` : "Explore Places"}
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Select a place to view details, maps, and booking links
          </h1>

          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                if (search.trim()) {
                  navigate(`/search?searchTerm=${search}&state=${stateSlug}`);
                }
              }}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>
        </div>

        {/* ✅ Main content identical to Home */}
        <div className="main p-6 flex flex-col gap-5">
          {loading && <h1 className="text-center text-2xl">Loading...</h1>}
          {!loading && places.length === 0 && (
            <h1 className="text-center text-2xl">No Places Found</h1>
          )}

          {!loading && places.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold">
                {stateName ? `Explore ${stateName}` : "Explore Places"}
              </h1>

              {/* ✅ Same grid layout as Home */}
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {places.map((place, i) => {
                  const packageData = {
                    _id: place._id,
                    packageName: place.name,
                    packageImages: [place.image],
                    packageDestination: stateName,
                    packageDescription:
                      place.shortDescription || place.description || "",
                    slug: place.slug,
                  };
                  return (
                    <div
                      key={i}
                      onClick={() => navigate(`/places/${place.slug}`)}
                      className="cursor-pointer hover:scale-105 transition-all duration-150"
                    >
                      <PackageCard packageData={packageData} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
