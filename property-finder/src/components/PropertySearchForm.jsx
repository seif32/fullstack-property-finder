"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { listingTypes, locations, propertyTypes } from "../data/dummyData";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

// Custom styled MUI Slider
const PriceSlider = styled(Slider)(({ theme }) => ({
  color: "#000",
  height: 3,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    border: "2px solid #000",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "bold",
    top: -22,
    backgroundColor: "unset",
    color: "#000",
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
    height: 3,
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
    height: 3,
  },
}));

function PropertySearchForm({ onSearch, compact = false }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      location: "",
      propertyType: "",
      listingType: "",
      minPrice: 0,
      maxPrice: 5000000,
      bedrooms: "",
    },
  });

  const [priceRange, setPriceRange] = useState([0, 5000000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    setValue("minPrice", newValue[0]);
    setValue("maxPrice", newValue[1]);
  };

  const formatPrice = (value) => `$${value.toLocaleString()}`;

  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data);
    } else {
      const searchParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== "" && value !== 0) {
          searchParams.append(key, value);
        }
      });
      navigate(`/properties?${searchParams.toString()}`);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm ${
        compact ? "p-5" : "p-6 md:p-8"
      }`}
    >
      {!compact && (
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Find Your Dream Property
          </h2>
          <p className="text-gray-500">
            Discover the perfect place to call home
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Location Select */}
          <div className="relative group">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-150"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <select
                id="location"
                {...register("location")}
                className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-xl transition-all duration-200"
              >
                <option value="">Any Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Property Type Select */}
          <div className="relative group">
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Property Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-150"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <select
                id="propertyType"
                {...register("propertyType")}
                className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-xl transition-all duration-200"
              >
                <option value="">Any Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Listing Type Select */}
          <div className="relative group">
            <label
              htmlFor="listingType"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Listing Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-150"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <select
                id="listingType"
                {...register("listingType")}
                className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-xl transition-all duration-200"
              >
                <option value="">Any Listing Type</option>
                {listingTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bedrooms Select */}
          <div className="relative group">
            <label
              htmlFor="bedrooms"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Bedrooms
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 group-hover:text-black transition-colors duration-150"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              <select
                id="bedrooms"
                {...register("bedrooms")}
                className="block w-full pl-10 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent rounded-xl transition-all duration-200"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n.toString()}>
                    {n}+
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="col-span-full bg-gray-50 p-5 rounded-xl border border-gray-100 mt-2">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="price-range"
                className="block text-sm font-medium text-gray-700"
              >
                Price Range
              </label>
              <div className="flex space-x-3">
                <span className="text-sm font-semibold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                  {formatPrice(priceRange[0])}
                </span>
                <span className="text-sm font-semibold bg-black text-white px-3 py-1 rounded-full shadow-sm">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
            </div>
            <div className="px-2 pt-1">
              <PriceSlider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                valueLabelFormat={formatPrice}
                min={0}
                max={5000000}
                step={50000}
                disableSwap
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>$0</span>
              <span>$5M</span>
            </div>
          </div>

          {/* Search Button */}
          <div className="col-span-full mt-4">
            <button
              type="submit"
              className={`w-full flex items-center justify-center bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg ${
                compact ? "py-2.5 text-sm" : "py-4 text-base"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
              {compact ? "Search" : "Search Properties"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PropertySearchForm;
