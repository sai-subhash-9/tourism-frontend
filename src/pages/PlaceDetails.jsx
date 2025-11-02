// src/pages/PlaceDetails.jsx
import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const PlaceDetails = () => {
  const { placeSlug } = useParams(); // /places/:placeSlug
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const base =
          import.meta.env.VITE_BACKEND_URL ||
          "http://localhost:5000/api/v1/tourism";
        const res = await axios.get(`${base}/places/${placeSlug}`);
        if (res.data?.success) {
          setPlace(res.data.data);
        } else {
          setPlace(null);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching place details:", err);
        setPlace(null);
        setLoading(false);
      }
    };

    if (placeSlug) fetchPlace();
  }, [placeSlug]);

  if (loading) {
    return (
      <div className="main w-full">
        <div className="w-full flex flex-col">
          <div className="backaground_image w-full"></div>
          <div className="main p-6">
            <h1 className="text-center text-2xl">Loading place details...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="main w-full">
        <div className="w-full flex flex-col">
          <div className="backaground_image w-full"></div>
          <div className="main p-6">
            <h1 className="text-center text-2xl">Place not found.</h1>
            <div className="text-center mt-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-slate-400 text-white px-4 py-2 rounded-lg"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // fields: place.name, place.image, place.description, place.googleMapEmbedUrl, place.officialLink, place.bookingLink
  const mainImage = place.image || (place.packageImages && place.packageImages[0]) || "/images/placeholder.jpg";

  return (
    <div className="main w-full">
      <div className="w-full flex flex-col">
        <div className="backaground_image w-full"></div>

        <div className="top-part w-full gap-2 flex flex-col">
          <h1 className="text-white text-4xl text-center font-bold underline mb-2">
            {place.name}
          </h1>
          <h1 className="text-white text-sm text-center xsm:text-lg font-semibold">
            {place.state && place.state.name ? place.state.name : place.stateSlug || ""}
          </h1>

          <div className="w-full flex justify-center items-center gap-2 mt-8">
            <input
              type="text"
              className="rounded-lg outline-none w-[230px] sm:w-2/5 p-2 border border-black bg-opacity-40 bg-white text-white placeholder:text-white font-semibold"
              placeholder="Search a place..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                if (!search.trim()) return;
                navigate(`/search?searchTerm=${search}`);
              }}
              className="bg-white w-10 h-10 flex justify-center items-center text-xl font-semibold rounded-full hover:scale-95"
            >
              Go
            </button>
          </div>
        </div>

        <div className="main p-6 flex flex-col gap-6">
          <div className="w-full flex flex-col gap-6">
            <img
              src={mainImage}
              alt={place.name}
              className="w-full rounded-xl mb-6 shadow-lg h-[420px] object-cover"
              onError={(e) => (e.target.src = "/images/placeholder.jpg")}
            />

            <div className="text-gray-700">
              <p className="mb-4">{place.description}</p>
            </div>

            {place.googleMapEmbedUrl && (
              <div className="mb-6">
                <iframe
                  src={place.googleMapEmbedUrl}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                  title={`${place.name} location`}
                ></iframe>
              </div>
            )}

            <div className="flex gap-4">
              {place.officialLink && (
                <a
                  href={place.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Official Website
                </a>
              )}

              {place.bookingLink && (
                <a
                  href={place.bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Booking Info
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
