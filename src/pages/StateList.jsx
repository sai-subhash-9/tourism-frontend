import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Home.css"; // ✅ Keeps identical layout & style
import { FaMapMarkerAlt } from "react-icons/fa";

const StateList = () => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);

  // You can later fetch states from backend or a JSON file
  useEffect(() => {
    // Temporary sample data — replace with your dynamic data later
    setStates([
      {
        name: "Goa",
        image: "images/goa.jpg",
        description: "Famous for its beaches, forts, and Portuguese heritage.",
        slug: "goa",
      },
      {
        name: "Tamil Nadu",
        image: "images/tamilnadu.jpg",
        description: "Land of temples and classical culture in South India.",
        slug: "tamil-nadu",
      },
      {
        name: "Maharashtra",
        image: "images/maharashtra.jpg",
        description: "Home to Mumbai, Ajanta Caves, and scenic hill stations.",
        slug: "maharashtra",
      },
      {
        name: "Karnataka",
        image: "images/karnataka.jpg",
        description: "Rich heritage, waterfalls, and modern tech cities.",
        slug: "karnataka",
      },
    ]);
  }, []);

  return (
    <div className="main w-full flex flex-col items-center p-6">
      {/* 🔹 Title Section - Same typography as Home */}
      <h1 className="text-4xl font-bold text-center underline mb-4 text-white">
        Explore Indian States
      </h1>
      <p className="text-center text-white mb-8 text-lg">
        Choose a state to explore its top destinations and attractions.
      </p>

      {/* 🔹 Grid Section (matches Home.jsx grid structure) */}
      <div className="grid 2xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 w-full max-w-6xl">
        {states.map((state, index) => (
          <div
            key={index}
            onClick={() => navigate(`/states/${state.slug}`)}
            className="bg-white border rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer flex flex-col"
          >
            <img
              src={state.image}
              alt={state.name}
              className="w-full h-[220px] object-cover"
            />
            <div className="p-3 flex flex-col gap-1">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-600" />
                {state.name}
              </h2>
              <p className="text-gray-700 text-sm line-clamp-2">
                {state.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateList;
