/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomerList from "./components/CustomerList";
import EditCustomer from "./components/EditCustomer";
import AddCustomer from "./components/AddCustomer";
import { ToastContainer } from "react-toastify";
import "./index.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Update token state whenever it changes in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/customers" /> : <Register />}
        />
        <Route
          path="/customers"
          element={token ? <CustomerList /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-customer/:id"
          element={token ? <EditCustomer /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-customer"
          element={token ? <AddCustomer /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
