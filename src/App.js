import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Redux
import store from "./domain/store";
import { Provider } from "react-redux";

// Componentes
import NavbarMenu from "./presentation/components/Navbar";

// Pages
import Home from "./presentation/pages/home";
import Register from "./presentation/pages/register";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}
