"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check user role
  const isAgent = user?.role === "AGENT";
  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";

  const commonPages = [
    { name: "Home", path: "/", icon: "home" },
    { name: "Properties", path: "/properties", icon: "building" },
    { name: "Locations", path: "/locations", icon: "map-pin" },
  ];

  // ✅ Pages only for regular users (role: USER)
  const userPages = [
    { name: "My Bookmarks", path: "/bookmarks", icon: "heart" },
    // { name: "My Requests", path: "/my-requests", icon: "calendar" }, // Placeholder route (not yet in router)
  ];

  // ✅ Pages only for agents (role: AGENT)
  const agentPages = [
    { name: "My Properties", path: "/my-properties", icon: "clipboard" },
    { name: "Appointments", path: "/agent/viewing-requests", icon: "eye" },
    // You can later add analytics when implemented
  ];

  // ✅ Pages only for admin (role: ADMIN)
  const adminPages = [
    { name: "User Management", path: "/admin/users", icon: "users" },
    // Add additional admin routes if implemented in the router
  ];

  // Combine pages based on user role
  // ✅ Role-based page selection logic
  let pages = [];
  if (isAdmin) {
    pages = [...adminPages];
  } else if (isAgent) {
    pages = [...commonPages, ...agentPages];
  } else {
    pages = [...commonPages, ...userPages];
  }
  // Settings menu items
  const commonSettings = [
    { name: "Profile", path: "/profile", icon: "user" },
    // { name: "Settings", path: "/settings", icon: "settings" }, // You may need to implement /settings route
    { name: "Logout", path: "/", icon: "log-out" },
  ];

  // Role-specific settings
  // const userSettings = [
  //   { name: "Bookmarks", path: "/bookmarks", icon: "heart" },
  //   { name: "Viewing History", path: "/history", icon: "clock" },
  // ];

  // const agentSettings = [
  //   { name: "My Properties", path: "/my-properties", icon: "home" },
  //   { name: "Commissions", path: "/commissions", icon: "dollar-sign" },
  // ];

  // const adminSettings = [
  //   { name: "System Settings", path: "/admin/settings", icon: "sliders" },
  //   { name: "Logs", path: "/admin/logs", icon: "activity" },
  // ];

  // Combine settings based on user role
  // let settings = [];
  // if (isAdmin) {
  //   settings = [...adminSettings, ...commonSettings];
  // } else if (isAgent) {
  //   settings = [...agentSettings, ...commonSettings];
  // } else {
  //   settings = [...userSettings, ...commonSettings];
  // }

  const settings = [...commonSettings];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuItemClick = async (path, name) => {
    setUserMenuOpen(false);
    setMenuOpen(false);

    if (name === "Logout") {
      await signOut();
      navigate("/login");
      return;
    }

    navigate(path);
  };

  // Function to render icons
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case "building":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
            <line x1="12" y1="6" x2="12" y2="6.01" />
            <line x1="12" y1="10" x2="12" y2="10.01" />
            <line x1="12" y1="14" x2="12" y2="14.01" />
            <line x1="12" y1="18" x2="12" y2="18.01" />
          </svg>
        );
      case "map-pin":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case "bookmark":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        );
      case "clipboard":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          </svg>
        );
      case "message-circle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        );
      case "user":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case "settings":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        );
      case "log-out":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        );
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        );
      case "bar-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="20" x2="12" y2="10" />
            <line x1="18" y1="20" x2="18" y2="4" />
            <line x1="6" y1="20" x2="6" y2="16" />
          </svg>
        );
      case "grid":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        );
      case "users":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case "database":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        );
      case "pie-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
            <path d="M22 12A10 10 0 0 0 12 2v10z" />
          </svg>
        );
      case "clock":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      case "dollar-sign":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        );
      case "sliders":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        );
      case "activity":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    if (isAdmin) return "bg-purple-100 text-purple-800";
    if (isAgent) return "bg-amber-100 text-amber-800";
    return "bg-blue-100 text-blue-800";
  };

  // Get role badge text
  const getRoleBadgeText = () => {
    if (isAdmin) return "Admin";
    if (isAgent) return "Agent";
    return "User";
  };

  // Get logo badge for role
  const getRoleBadge = () => {
    if (isAdmin) {
      return (
        <div className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
          ADMIN
        </div>
      );
    }
    if (isAgent) {
      return (
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
          PRO
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md py-2"
            : "bg-white/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold text-xl ${
                  isAdmin
                    ? "bg-gradient-to-br from-purple-600 to-indigo-600"
                    : isAgent
                      ? "bg-gradient-to-br from-amber-500 to-orange-600"
                      : "bg-gradient-to-br from-blue-600 to-purple-600"
                }`}
              >
                PF
              </div>
              {getRoleBadge()}
            </div>
            <span
              className={`ml-2 text-xl font-bold bg-clip-text text-transparent ${
                isAdmin
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : isAgent
                    ? "bg-gradient-to-r from-amber-500 to-orange-600"
                    : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}
            >
              PropertyFinder
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end justify-center gap-1.5">
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${
                  menuOpen ? "w-6 -rotate-45 translate-y-2" : "w-6"
                }`}
              />
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? "opacity-0" : "w-4"}`}
              />
              <span
                className={`block h-0.5 bg-gray-600 transition-all duration-300 ${
                  menuOpen ? "w-6 rotate-45 -translate-y-2" : "w-5"
                }`}
              />
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  className={`px-3 py-2 rounded-lg flex items-center transition-all duration-200 ${
                    isActive
                      ? isAdmin
                        ? "bg-purple-50 text-purple-600 font-medium"
                        : isAgent
                          ? "bg-amber-50 text-amber-600 font-medium"
                          : "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-1.5">{renderIcon(page.icon)}</span>
                  {page.name}
                  {isActive && (
                    <span
                      className={`ml-1.5 w-1.5 h-1.5 rounded-full ${
                        isAdmin
                          ? "bg-purple-600"
                          : isAgent
                            ? "bg-amber-600"
                            : "bg-blue-600"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User avatar/menu */}
          {user ? (
            <div className="relative ml-4 flex items-center">
              {/* Notification bell */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center focus:outline-none group"
              >
                <div
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-${
                    isAdmin ? "purple" : isAgent ? "amber" : "blue"
                  }-500 transition-all duration-200`}
                >
                  {user.profileImage ? (
                    <img
                      src={user.profileImage || "/placeholder.svg"}
                      alt={user.firstName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center text-white font-semibold ${
                        isAdmin
                          ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                          : isAgent
                            ? "bg-gradient-to-br from-amber-500 to-orange-600"
                            : "bg-gradient-to-br from-blue-500 to-purple-600"
                      }`}
                    >
                      {user.firstName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <div className="ml-2 hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{getRoleBadgeText()}</p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ml-1 text-gray-500 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* User dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 transition-all duration-200 origin-top-right">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center text-white font-semibold ${
                          isAdmin
                            ? "bg-gradient-to-br from-purple-500 to-indigo-600"
                            : isAgent
                              ? "bg-gradient-to-br from-amber-500 to-orange-600"
                              : "bg-gradient-to-br from-blue-500 to-purple-600"
                        }`}
                      >
                        {user.firstName?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getRoleBadgeColor()}`}
                          >
                            {getRoleBadgeText()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    {settings.map((item) => (
                      <button
                        key={item.name}
                        onClick={() =>
                          handleMenuItemClick(item.path, item.name)
                        }
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700"
                      >
                        <span className="w-5 h-5 mr-3 text-gray-500">
                          {renderIcon(item.icon)}
                        </span>
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden px-4 py-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Link
                  key={page.name}
                  to={page.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center px-3 py-2.5 rounded-lg ${
                    isActive
                      ? isAdmin
                        ? "bg-purple-50 text-purple-600 font-medium"
                        : isAgent
                          ? "bg-amber-50 text-amber-600 font-medium"
                          : "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{renderIcon(page.icon)}</span>
                  {page.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
      {/* Add margin to prevent content from being cut off by fixed header */}
      <div className="h-20" />{" "}
      {/* Adjust height as needed based on your header size */}
    </>
  );
};

export default Header;
