"use client";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function UnauthorizedPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H9a3 3 0 00-3 3v1m12 0v1a3 3 0 01-3 3h-1m-2-6l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Access Denied
          </h1>
          <div className="h-1 w-16 bg-red-500 mx-auto mb-4" />

          <p className="text-center text-gray-600 mb-6">
            You don't have permission to access this page. This area may require
            additional privileges or authorization.
          </p>

          <div className="space-y-3">
            {user ? (
              <p className="text-sm text-center text-gray-500">
                Logged in as <span className="font-medium">{user.email}</span>
              </p>
            ) : (
              <p className="text-sm text-center text-gray-500">
                You are not currently logged in. Try signing in with an account
                that has the required permissions.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleGoBack}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Home
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          If you believe this is an error, please contact{" "}
          <a
            href="mailto:support@propertyfinder.com"
            className="text-black hover:underline"
          >
            support@propertyfinder.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
