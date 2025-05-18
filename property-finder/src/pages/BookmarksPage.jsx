"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currentUser, properties } from "../data/dummyData";
import PropertyCard from "../components/PropertyCard";
import { useAuth } from "../auth/AuthContext";
import { useGetUserBookmarks } from "../hooks/bookmark/useGetUserBookmarks";
import LoadingSpinner from "../components/LoadingSpinner";

function BookmarksPage() {
  const { user } = useAuth(); // assume this gives you { id, ... }

  const { data: bookmarkedProperties = [], isLoading } = useGetUserBookmarks(
    user?.id
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Your Bookmarked Properties
      </h1>
      <div className="border-b border-gray-200 mb-8" />

      {bookmarkedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedProperties.map((property) => (
            <PropertyCard
              key={property.property.id}
              property={property.property}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            You haven't bookmarked any properties yet
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Browse our listings and save your favorite properties to view them
            later
          </p>
          <Link
            to="/properties"
            className="inline-block px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
