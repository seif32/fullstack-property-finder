import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PropertyImageGallery from "../components/PropertyImageGallery";
import PropertyReviews from "../components/PropertyReviews";
import PropertyCard from "../components/PropertyCard";
import { useGetPropertyById } from "../hooks/property/useGetPropertyById";
import { useGetAllProperties } from "../hooks/property/useGetAllProperties";
import { useGetPropertyImages } from "../hooks/property-image/useGetPropertyImages";
import { useGetPropertyReviews } from "../hooks/review/useGetPropertyReviews";
import { useCreateBookmark } from "../hooks/bookmark/useCreateBookmark";
import { useAuth } from "../auth/AuthContext";
import { useCheckBookmark } from "../hooks/bookmark/useCheckBookmark";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDeleteBookmarkByUserAndProperty } from "../hooks/bookmark/useDeleteBookmarkByUserAndProperty";

function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: properties, isLoading } = useGetAllProperties();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleContactAgent = () => {
    navigate(`/properties/${id}/request-appointment`);
  };

  const { user } = useAuth();
  const isAgent = user.role === "AGENT";
  const isAdmin = user.role === "ADMIN";

  const { data: property, isLoading: loading } = useGetPropertyById(id);

  const { data: images = [], isLoading: loadingImages } =
    useGetPropertyImages(id);

  const { data: reviews = [], isLoading: loadingReviews } =
    useGetPropertyReviews(id);

  const { data: isBookmarkedFromApi, isLoading: loadingBookmarkStatus } =
    useCheckBookmark(user?.id, Number(id));

  useEffect(() => {
    if (typeof isBookmarkedFromApi === "boolean") {
      setIsBookmarked(isBookmarkedFromApi);
    }
  }, [isBookmarkedFromApi]);

  const { mutate: createBookmark, isLoading: creating } = useCreateBookmark({
    onSuccess: () => {
      setIsBookmarked(true);
    },
  });

  const { mutate: deleteBookmarkMutation, isLoading: deleting } =
    useDeleteBookmarkByUserAndProperty({
      onSuccess: () => {
        setIsBookmarked(false);
      },
    });

  const handleBookmarkToggle = () => {
    const payload = {
      userId: user.id,
      propertyId: Number(id),
    };

    if (isBookmarked) {
      deleteBookmarkMutation(payload);
    } else {
      createBookmark({
        ...payload,
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleShare = () => {
    console.log(`Sharing property ${id}`);
    // In a real app, you would implement sharing functionality
    alert("Share functionality would be implemented here");
  };

  if (
    loading ||
    isLoading ||
    loadingImages ||
    loadingReviews ||
    loadingBookmarkStatus
  ) {
    return <LoadingSpinner message="Loading Property Details . . ." />;
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <Link
          to="/properties"
          className="inline-block px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Back to Properties
        </Link>
      </div>
    );
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-black inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                to="/properties"
                className="ml-1 text-gray-700 hover:text-black md:ml-2"
              >
                Properties
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2">
                {property.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Property Title and Actions */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1.5 text-gray-600">{property.location}</span>
          </div>
        </div>
        <div className="flex mt-4 sm:mt-0">
          {!isAgent && !isAdmin && (
            <button
              onClick={handleBookmarkToggle}
              disabled={creating || deleting}
              className={`p-2 rounded-full ${
                isBookmarked
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-500 hover:bg-gray-100"
              } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={
                isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
              }
            >
              {isBookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                  className="h-6 w-6"
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

          {/* <button
            onClick={handleShare}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors ml-2"
            aria-label="Share property"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button> */}
        </div>
      </div>

      {/* Property Images */}
      {loadingImages ? (
        <div className="h-64 flex items-center justify-center">
          Loading images...
        </div>
      ) : images.length > 0 ? (
        <PropertyImageGallery images={images} />
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500">
          No images available.
        </div>
      )}

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-8">
          {/* Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
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
                <span className="ml-2">
                  {property.bedrooms}{" "}
                  {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
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
                <span className="ml-2">
                  {property.bathrooms}{" "}
                  {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
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
                <span className="ml-2">{property.area} m²</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="ml-2">{property.propertyType}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-4" />
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <PropertyReviews reviews={reviews} propertyId={property.id} />
          </div>
        </div>

        <div className="md:col-span-4">
          {/* Price Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-bold text-black mb-2">
              {formatPrice(property.price)}
              {property.listingType === "Rent" && "/month"}
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                property.listingType === "Sale"
                  ? "bg-black text-white"
                  : "bg-gray-800 text-white"
              }`}
            >
              {property.listingType === "Sale" ? "For Sale" : "For Rent"}
            </span>
            {!isAgent && (
              <button
                onClick={handleContactAgent}
                className="w-full border border-black text-black py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Contact Agent
              </button>
            )}
          </div>

          {/* Owner/Agent Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Listed by
            </h3>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center mr-3">
                {property.ownerName.charAt(0)}
              </div>
              <span className="font-medium">{property.ownerName}</span>
            </div>
            <button
              className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() =>
                console.log("View agent profile", property.ownerId)
              }
            >
              View Profile
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-[1.01]">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 00-6 6c0 4.5 6 10 6 10s6-5.5 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
                  clipRule="evenodd"
                />
              </svg>
              Location
            </h3>

            <div className="relative h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-sm font-medium">
              📍 {property.location || "Unknown location"}
            </div>

            {/* <button
              onClick={() => console.log("View on map", property.location)}
              className="block w-full py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View on Map
            </button> */}
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Similar Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties
            .filter(
              (p) =>
                p.id !== property.id && p.propertyType === property.propertyType
            )
            .slice(0, 3)
            .map((similarProperty) => (
              <PropertyCard
                key={similarProperty.id}
                property={similarProperty}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailPage;
