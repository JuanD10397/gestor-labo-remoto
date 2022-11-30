import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Redux
import store from "./domain/store";
import { Provider } from "react-redux";

// Componentes
import NavbarMenu from "./presentation/components/Navbar";

// Pages
import Home from "./presentation/pages/home";
import Register from "./presentation/pages/register";
import Schedule from "./presentation/pages/schedule";
import MyLabos from "./presentation/pages/myLabos";
import LaboDescription from "./presentation/pages/laboDescription";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/horario" element={<Schedule />} />
          <Route path="/laboratories" element={<MyLabos />} />
          <Route path="/laboratories/:laboId" element={<LaboDescription />} />
        </Routes>
      </Router>
    </Provider>
  );
}
