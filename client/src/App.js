import React from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Forms/SignUp";
import SignIn from "./Components/Forms/SignIn";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
