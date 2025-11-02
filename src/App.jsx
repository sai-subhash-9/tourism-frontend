import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Common layout
import Header from "./pages/components/Header";

// Main pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import About from "./pages/About";

// Package pages



// Tourism pages (new)
import PlacesList from "./pages/PlacesList";
import PlaceDetails from "./pages/PlaceDetails";

const App = () => {
  return (
    <BrowserRouter>
      {/* Header should remain visible on all pages */}
      <Header />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* Package routes */}
      
      

        {/* =========================
             🆕 Tourism Routes (New)
           ========================= */}
        {/* Show list of places for a state */}
        <Route path="/states/:stateSlug" element={<PlacesList />} />

        {/* Show single place details */}
        <Route path="/places/:placeSlug" element={<PlaceDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
