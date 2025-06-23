import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

// Importing necessary components from react-router-dom
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

import Home from "../pages/homes/students/Home";

import TeacherHome from "../pages/homes/teachers/TeacherHome";
import AddHomework from "../pages/controllers/teacherController/AddHomework";
import AddGrade from "../pages/controllers/teacherController/AddGrade";

import Profile from "../pages/controllers/officeController/profile/Profile";
import AddDays from "../pages/controllers/officeController/addDays/AddDays";

function AppRouter() {
  const { currentUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={currentUser && currentUser.type === "Office" ? <Register /> : <Login />} />

        <Route
          path="/home/:id"
          element={
            currentUser && currentUser.type == "Student" ? <Home /> : <Login />
          }
        />

        <Route
          path="/teacher-home/:id"
          element={
            currentUser && currentUser.type == "Teacher" ? (
              <TeacherHome />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/teacher-home/addhomework/:id"
          element={
            currentUser && currentUser.type == "Teacher" ? (
              <AddHomework />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/teacher-home/addgrade/:id"
          element={
            currentUser && currentUser.type == "Teacher" ? (
              <AddGrade />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/profile/:id"
          element={currentUser && currentUser.type == "Office" ? <Profile /> : <Login />}
        />
        <Route
          path="/office-home/addDays/:id"
          element={
            currentUser && currentUser.type == "Office" ? <AddDays /> : <Login />
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
