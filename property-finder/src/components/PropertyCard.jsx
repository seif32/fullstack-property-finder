import { useState } from "react";
import { Link } from "react-router-dom";
import { currentUser } from "../data/dummyData";
import { useGetPropertyImages } from "../hooks/property-image/useGetPropertyImages";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth } from "../auth/AuthContext";
import { useCheckBookmark } from "../hooks/bookmark/useCheckBookmark";
import { useCreateBookmark } from "../hooks/bookmark/useCreateBookmark";
import { useDeleteBookmarkByUserAndProperty } from "../hooks/bookmark/useDeleteBookmarkByUserAndProperty";

function PropertyCard({ property }) {
  const { user } = useAuth();

  const isAgent = user.role === "AGENT";
  const isAdmin = user.role === "ADMIN";

  const { data: isBookmarked = false, isLoading: loadingBookmarkCheck } =
    useCheckBookmark(user?.id, property.id);

  const { mutate: createBookmark, isLoading: creating } = useCreateBookmark();
  const { mutate: deleteBookmark, isLoading: deleting } =
    useDeleteBookmarkByUserAndProperty();

  const { data: images, isLoading } = useGetPropertyImages(property.id);

  if (loadingBookmarkCheck || isLoading) return <LoadingSpinner />;

  const primaryImage = images.find((img) => img.isPrimary) || images[0];

  const handleBookmarkToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      userId: user.id,
      propertyId: property.id,
      createdAt: new Date().toISOString(),
    };

    if (isBookmarked) {
      deleteBookmark({ userId: user.id, propertyId: property.id });
    } else {
      createBookmark(payload);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={primaryImage?.imageUrl || "/placeholder.svg"}
          alt={primaryImage?.description || "Property image"}
          className="h-48 w-full object-cover"
        />

        {!isAgent && !isAdmin && (
          <button
            onClick={handleBookmarkToggle}
            disabled={creating || deleting}
            className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={
              isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
            }
          >
            {isBookmarked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        )}

        <span
          className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md ${
            property.listingType === "Sale"
              ? "bg-black text-white"
              : "bg-gray-800 text-white"
          }`}
        >
          {property.listingType}
        </span>
      </div>

      <Link
        to={`/properties/${property.id}`}
        className="block p-4 no-underline text-inherit"
      >
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 text-sm text-gray-600">
            {property.location}
          </span>
        </div>

        <p className="font-bold text-lg text-gray-900 my-3">
          {formatPrice(property.price)}
          {property.listingType === "Rent" && "/month"}
        </p>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
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
            {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
          </div>

          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {property.area} m²
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PropertyCard;
