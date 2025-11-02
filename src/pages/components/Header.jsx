import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/images/profile.png";

const Header = () => {
  
  return (
    <>
      <div className="bg-slate-400 p-4 flex justify-between items-center">
        <h1
          className="h-min text-4xl font-bold relative"
          style={{
            color: "transparent",
            WebkitTextStroke: "0.7px",
            WebkitTextStrokeColor: "#fff",
          }}
        >
          Come
          <span
            className="shadow-xl rounded-lg text-slate-700 text-2xl absolute left-1 top-[-10px] text-center"
            style={{
              WebkitTextStroke: "0",
            }}
          >
            Dream Tours
          </span>
        </h1>
        <ul className="flex flex-wrap items-center justify-end gap-2 text-white font-semibold list-none">
          <li className="hover:underline hover:scale-105 transition-all duration-150">
            <Link to={`/`}>Home</Link>
          </li>
         
          <li className="hover:underline hover:scale-105 transition-all duration-150">
            <Link to={`/about`}>About</Link>
          </li>
          
        </ul>
      </div>
    </>
  );
};

export default Header;
