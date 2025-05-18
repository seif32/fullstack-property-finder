"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";
import { useAuth } from "../auth/AuthContext";
import { useGetAllProperties } from "../hooks/property/useGetAllProperties";
import LoadingSpinner from "../components/LoadingSpinner";

function PropertyListingPage() {
  const { user } = useAuth();
  const { data: properties = [], isLoading } = useGetAllProperties();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const propertiesPerPage = 6;

  // Extract filter values from URL params
  const location = searchParams.get("location") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const listingType = searchParams.get("listingType") || "";
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : 0;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : 5000000;
  const bedrooms = searchParams.get("bedrooms")
    ? Number(searchParams.get("bedrooms"))
    : "";

  useEffect(() => {
    if (!properties || properties.length === 0) return;

    let result = [...properties];

    if (location) result = result.filter((p) => p.location === location);
    if (propertyType)
      result = result.filter((p) => p.propertyType === propertyType);
    if (listingType)
      result = result.filter((p) => p.listingType === listingType);
    if (minPrice > 0) result = result.filter((p) => p.price >= minPrice);
    if (maxPrice < 5000000) result = result.filter((p) => p.price <= maxPrice);
    if (bedrooms) result = result.filter((p) => p.bedrooms >= bedrooms);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id); // Replace with `createdAt` in real backend
        break;
    }

    setFilteredProperties(result);
    setCurrentPage(1);
  }, [
    properties,
    location,
    propertyType,
    listingType,
    minPrice,
    maxPrice,
    bedrooms,
    sortBy,
  ]);

  const handleSearch = (data) => {
    const params = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== "" && value !== 0) params.append(key, value);
    });
    setSearchParams(params);
  };

  const handleSortChange = (event) => setSortBy(event.target.value);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const activeFilters = [];
  if (location)
    activeFilters.push({ key: "location", label: `Location: ${location}` });
  if (propertyType)
    activeFilters.push({ key: "propertyType", label: `Type: ${propertyType}` });
  if (listingType)
    activeFilters.push({ key: "listingType", label: `For: ${listingType}` });
  if (bedrooms)
    activeFilters.push({ key: "bedrooms", label: `${bedrooms}+ Beds` });
  if (minPrice > 0 || maxPrice < 5000000) {
    activeFilters.push({
      key: "price",
      label: `Price: $${minPrice} - $${maxPrice}`,
    });
  }

  const handleRemoveFilter = (key) => {
    const newParams = new URLSearchParams(searchParams);
    if (key === "price") {
      newParams.delete("minPrice");
      newParams.delete("maxPrice");
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleClearAllFilters = () => setSearchParams({});

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Property Listings</h1>

      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mb-4 text-blue-600 underline"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilters && (
        <div className="mb-6">
          <PropertySearchForm onSearch={handleSearch} />
        </div>
      )}

      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <div
              key={filter.key}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {filter.label}
              <button
                className="ml-2 text-red-600"
                onClick={() => handleRemoveFilter(filter.key)}
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={handleClearAllFilters}
            className="text-sm text-red-500 underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {currentProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    i + 1 === currentPage
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            No properties found
          </h2>
          <button
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            onClick={handleClearAllFilters}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default PropertyListingPage;
