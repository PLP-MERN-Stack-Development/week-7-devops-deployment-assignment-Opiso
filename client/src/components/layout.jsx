import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("User in Layout:", user);

  const userMenu = [
    {
      name: "Home",
      path: "./",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doc",
      icon: "ri-nurse-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "./",
      icon: "ri-home-line",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "ri-file-list-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-nurse-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="main p-2">
      <div className="flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1>CA</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`flex menu-item ${isActive && "active-menu-item"}`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={"flex menu-item"}
              onClick={() => navigate("/login")}
            >
              <i className="ri-logout-circle-r-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div>
              {!collapsed ? (
                <i
                  className="ri-close-large-line header-action-icon"
                  onClick={() => setCollapsed(true)}
                ></i>
              ) : (
                <i
                  className="ri-menu-line header-action-icon"
                  onClick={() => setCollapsed(false)}
                ></i>
              )}
            </div>
            <div className="flex">
              <i className="ri-notification-line header-action-icon"></i>
              <Link className="anchor" to="/profile">
                {user?.name || "profile"}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
