import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import NavbarMenu from "./presentation/components/Navbar";

// Pages
import Start from "./presentation/pages/start";
import HomeMenu from "./presentation/pages/home";
import TeacherRegister from "./presentation/pages/teacherRegister/teacherRegister";
import StudentRegister from "./presentation/pages/studentRegister/studentRegister";
import TeacherLogin from "./presentation/pages/teacherLogin/teacherLogin";
import StudentLogin from "./presentation/pages/studentLogin/studentLogin";
import Schedule from "./presentation/pages/schedule";
import MyLabos from "./presentation/pages/myLabos";
import LaboDescription from "./presentation/pages/laboDescription";

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<HomeMenu />} />
        <Route path="/teacherRegister" element={<TeacherRegister />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route path="/horario" element={<Schedule />} />
        <Route path="/laboratories" element={<MyLabos />} />
        <Route path="/laboratories/:laboId" element={<LaboDescription />} />
      </Routes>
    </Router>
  );
}
