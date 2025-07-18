import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import { useState } from "react";

const ProtectedRoutes = (props) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userChecked, setUserChecked] = useState(false);

  const getUser = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      navigate("/login");
    } finally {
      setUserChecked(true);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setUserChecked(true);
    }
  }, [user]);

  if (!userChecked) {
    return null;
  }
  if (user) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
