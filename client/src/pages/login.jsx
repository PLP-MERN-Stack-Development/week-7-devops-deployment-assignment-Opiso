import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from "../redux/alertsSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        formData
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Home Page");
        localStorage.setItem('token', response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
      console.error(err)
    }
  };
  return (
    <div className="m-5">
      <div className="max-w-[50%] mx-auto border bg-white mb-3 border-green-500 rounded-lg shadow-md p-6">
        <h2 className="text-xl flex justify-center font-semibold mb-2">
          Login Page
        </h2>
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label>Email Address:</label>
            <input
              className=" p-2"
              type="email"
              name="email"
              onChange={handleChange}
              required
              style={{ width: "100%", border: "1px solid green" }}
            />
          </div>
          <div className="mb-5">
            <label className="">Password:</label>
            <input
              className="p-2"
              type="password"
              name="password"
              onChange={handleChange}
              required
              style={{ width: "100%", border: "1px solid green" }}
            />
          </div>
          {/* {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>} */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            style={{cursor:  'pointer'}}
          >
            Login
          </button>
        </form>
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Register
        </Link>
      </div>
      <div className="p-1"></div>
    </div>
  );
};

export default Login;
