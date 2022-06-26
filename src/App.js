import React from "react";
import "./App.css";

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const user = {
    name: "ahmed",
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!user ? (
            <Route path="/login" element={<LoginScreen />}></Route>
          ) : (
            <Route path="/" element={<HomeScreen />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
