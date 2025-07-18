import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/home";
import ProtectedRoutes from "./components/protectedRoutes";
import PublicRoutes from "./components/publicRoutes";

import "./index.css";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="loader-parent m-3 bg-gray-100">
          <div className="loader"></div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
