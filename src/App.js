import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import NavbarMenu from "./presentation/components/Navbar";

// Pages
import Home from "./presentation/pages/home";
import Register from "./presentation/pages/register";
import Login from "./presentation/pages/login";
import Schedule from "./presentation/pages/schedule";
import MyLabos from "./presentation/pages/myLabos";
import LaboDescription from "./presentation/pages/laboDescription";

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/horario" element={<Schedule />} />
        <Route path="/laboratories" element={<MyLabos />} />
        <Route path="/laboratories/:laboId" element={<LaboDescription />} />
      </Routes>
    </Router>
  );
}
