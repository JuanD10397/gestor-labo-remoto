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
import PrivateRouteTeacher from "./presentation/components/PrivateRouteTeacher";
import PrivateRouteStudent from "./presentation/components/PrivateRouteStudent";

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <PrivateRouteTeacher>
              <HomeMenu />
            </PrivateRouteTeacher>
          }
        />
        <Route path="/teacherRegister" element={<TeacherRegister />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route
          path="/horario"
          element={
            <PrivateRouteTeacher>
              <Schedule />
            </PrivateRouteTeacher>
          }
        />
        <Route
          path="/laboratories"
          element={
            <PrivateRouteTeacher>
              <MyLabos />
            </PrivateRouteTeacher>
          }
        />
        <Route
          path="/laboratories/:laboId"
          element={
            <PrivateRouteTeacher>
              <LaboDescription />
            </PrivateRouteTeacher>
          }
        />
      </Routes>
    </Router>
  );
}
