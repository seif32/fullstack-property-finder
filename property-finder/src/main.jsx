import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import HomePage from "./pages/HomePage";
import RootLayout from "./RootLayout";
import PropertyListingPage from "./pages/PropertyListingPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import CreatePropertyPage from "./pages/CreatePropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";
import PropertyImagesPage from "./pages/PropertyImagesPage";
import MyPropertiesPage from "./pages/MyPropertiesPage";
import BookmarksPage from "./pages/BookmarksPage";
import ProfilePage from "./pages/ProfilePage";
import AgentProfilePage from "./pages/AgentProfilePage";
import LocationBrowsePage from "./pages/LocationBrowsePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./auth/screens/LoginPage";
import SignUpPage from "./auth/screens/SignUp";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/screens/ProtectedRoute";
import AdminUserManagement from "./pages/AdminUserManagement";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ViewingRequestsPage from "./pages/ViewingRequestsPage";
import RequestAppointmentPage from "./pages/RequestAppointmentPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignUpPage /> },
  { path: "unauthorized", element: <UnauthorizedPage /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },

      {
        path: "properties",
        element: (
          <ProtectedRoute>
            <PropertyListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "properties/:id",
        element: (
          <ProtectedRoute>
            <PropertyDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "properties/create",
        element: (
          <ProtectedRoute requiredRole={"AGENT"}>
            <CreatePropertyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "properties/:id/edit",

        element: (
          <ProtectedRoute requiredRole={"AGENT"}>
            <EditPropertyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "properties/:id/images",
        element: (
          <ProtectedRoute requiredRole={"AGENT"}>
            <PropertyImagesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-properties",
        element: (
          <ProtectedRoute requiredRole={"AGENT"}>
            <MyPropertiesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookmarks",
        element: (
          <ProtectedRoute requiredRole={"USER"}>
            <BookmarksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "agents/:id",
        element: (
          <ProtectedRoute>
            <AgentProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "locations",
        element: (
          <ProtectedRoute>
            <LocationBrowsePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <ProtectedRoute requiredRole={"ADMIN"}>
            <AdminUserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "properties/:propertyId/request-appointment",
        element: (
          <ProtectedRoute requiredRole={"USER"}>
            <RequestAppointmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "agent/viewing-requests",
        element: (
          <ProtectedRoute requiredRole={"AGENT"}>
            <ViewingRequestsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "*",
        element: (
          <ProtectedRoute>
            <NotFoundPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
