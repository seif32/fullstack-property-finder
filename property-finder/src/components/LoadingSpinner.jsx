"use client";

import { useEffect, useState } from "react";

const LoadingSpinner = ({
  size = "medium",
  message = "Loading",
  showMessage = true,
  fullScreen = false,
}) => {
  const [dots, setDots] = useState(".");

  // Animate the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Determine size classes
  const sizeClasses = {
    small: "h-8 w-8 border-2",
    medium: "h-12 w-12 border-3",
    large: "h-16 w-16 border-4",
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;

  // Render full screen overlay if requested
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
        <div
          className={`${spinnerSize} rounded-full border-gray-300 border-t-black animate-spin`}
        />
        {showMessage && (
          <p className="mt-4 text-gray-800 dark:text-gray-200 font-medium text-lg">
            {message}
            {dots}
          </p>
        )}
      </div>
    );
  }

  // Render inline spinner
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div
        className={`${spinnerSize} rounded-full border-gray-300 border-t-black animate-spin`}
      />
      {showMessage && (
        <p className="mt-4 text-gray-800 dark:text-gray-200 font-medium">
          {message}
          {dots}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
