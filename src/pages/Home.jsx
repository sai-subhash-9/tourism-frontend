import React, { useCallback, useEffect, useState } from "react";
import "./styles/Home.css";
import { FaSearch } from "react-icons/fa";
import PackageCard from "./PackageCard";
import { useNavigate } from "react-router";
import axios from "axios";
const BASE_API = import.meta.env.VITE_API_BASE_URL;


const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ✅ Fetch all states (Tourism API)
  const getStates = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/v1/tourism/states"}`
      );
      if (res.data?.success) {
        setStates(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching states:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserName(user.name || "");
    }
    getStates();
  }, []);

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>

        {/* ======= Top Hero Section (Same UI) ======= */}
        <div className="top-part w-full gap-2 flex flex-col">
          {userName && (
            <h2 className="text-white text-xl text-center font-semibold mt-2">
              Welcome back, <span className="text-yellow-300">{userName}</span> 👋
            </h2>
          )}
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            Explore Incredible India 🌏
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            Discover top states and destinations with our Tourism Guide
          </h1>

          {/* ======= Search ======= */}
          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search a state..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                if (!search.trim()) return;
                navigate(`/search?state=${search}`);
              }}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>
        </div>

        {/* ======= Main Page ======= */}
        <div className="main p-6 flex flex-col gap-5">
          {loading && <h1 className="text-center text-2xl">Loading States...</h1>}
          {!loading && states.length === 0 && (
            <h1 className="text-center text-2xl">No States Available</h1>
          )}

          {/* ======= States Grid ======= */}
          {!loading && states.length > 0 && (
            <>
              <h1 className="text-2xl font-semibold mb-3">Explore Indian States</h1>
              <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-2 my-3">
                {states.map((state, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(`/states/${state.slug}`)}
                    className="cursor-pointer hover:scale-105 transition-all duration-150"
                  >
                    <PackageCard
                      packageData={{
                        packageName: state.name,
                        packageImage: state.image,
                        packageDescription: state.description,
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
