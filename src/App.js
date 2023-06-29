import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import NavbarMenu from "./presentation/components/Navbar";

// Pages
import Start from "./presentation/pages/start";
import Home from "./presentation/pages/home/home";
import TeacherRegister from "./presentation/pages/teacherRegister/teacherRegister";
import StudentRegister from "./presentation/pages/studentRegister/studentRegister";
import TeacherLogin from "./presentation/pages/teacherLogin/teacherLogin";
import StudentLogin from "./presentation/pages/studentLogin/studentLogin";
import Schedule from "./presentation/pages/schedule";
import MyLabos from "./presentation/pages/myLabos";
import LaboDescription from "./presentation/pages/laboDescription/laboDescription";
import PrivateRoute from "./presentation/components/PrivateRoute";
import TeacherCreateLabo from "./presentation/pages/teacherCreateLabo/teacherCreateLabo";
import PasswordMyLabos from "./presentation/pages/passwordMyLabos/passwordMyLabos";
import PasswordLabo from "./presentation/pages/passwordLabo/passwordLabo";

export default function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/teacherRegister" element={<TeacherRegister />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/teacherLogin" element={<TeacherLogin />} />
        <Route path="/studentLogin" element={<StudentLogin />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/createlabo/"
          element={
            <PrivateRoute>
              <TeacherCreateLabo />
            </PrivateRoute>
          }
        />
        <Route
          path="/laboratories/"
          element={
            <PrivateRoute>
              <MyLabos />
            </PrivateRoute>
          }
        />
        <Route
          path="/laboratories/:laboId"
          element={
            <PrivateRoute>
              <LaboDescription />
            </PrivateRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <Schedule />
            </PrivateRoute>
          }
        />
        <Route
          path="/passwordlabo"
          element={
            <PrivateRoute>
              <PasswordMyLabos />
            </PrivateRoute>
          }
        />
        <Route
          path="/passwordlabo/:laboId"
          element={
            <PrivateRoute>
              <PasswordLabo />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
