import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import bgImage from "./assets/bgImage.svg";
const App = () => {
  return (
    <div className=" bg-cover" style={{ backgroundImage: `url(${bgImage})` }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;
