import React from "react";
import "./HomeScreen.css";
import Navbar from "./Navbar";
import Banner from "./Banner";
function HomeScreen() {
  return (
    <div className="homeScreen">
      <Navbar />
      <Banner />
    </div>
  );
}

export default HomeScreen;
