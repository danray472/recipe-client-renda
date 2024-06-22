import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h1>Recipes</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipes">Saved Recipes</Link>
        {!cookies.access_token ? (
          <Link to="/auth">Login/Register</Link>
        ) : (
          <button onClick={logout}> Logout </button>
        )}
      </div>
    </div>
  );
};
