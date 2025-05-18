"use client";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropertySearchForm from "../components/PropertySearchForm";
import PropertyCard from "../components/PropertyCard";
import { useGetAllProperties } from "../hooks/property/useGetAllProperties";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  MapPinIcon,
  BuildingOffice2Icon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  KeyIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useGetAllLocations } from "../hooks/location/useGetAllLocations";

function HomePage() {
  const { data: properties, isLoading } = useGetAllProperties();
  const { data: locations, isLoading: isLocationLoading } =
    useGetAllLocations();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Handle mouse movement for interactive elements
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading || isLocationLoading) return <LoadingSpinner />;

  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section with 3D elements and animations */}
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />

          {/* Floating 3D shapes */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-blob animation-delay-4000" />

          {/* Interactive spotlight effect */}
          <div
            className="absolute inset-0 opacity-30 bg-gradient-radial from-blue-500/30 to-transparent"
            style={{
              background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent)`,
            }}
          />
        </div>

        {/* 3D Building Silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-48 overflow-hidden">
          <div className="relative w-full h-full">
            {/* City skyline silhouette */}
            <svg
              className="absolute bottom-0 w-full"
              viewBox="0 0 1200 200"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0,200 L0,120 L50,120 L50,80 L100,80 L100,120 L150,120 L150,70 L200,70 L200,150 L250,150 L250,100 L300,100 L300,150 L350,150 L350,70 L400,70 L400,150 L450,150 L450,100 L500,100 L500,150 L550,150 L550,70 L600,70 L600,120 L650,120 L650,80 L700,80 L700,120 L750,120 L750,70 L800,70 L800,150 L850,150 L850,100 L900,100 L900,150 L950,150 L950,70 L1000,70 L1000,150 L1050,150 L1050,100 L1100,100 L1100,150 L1150,150 L1150,70 L1200,70 L1200,200 Z"
                fill="rgba(0,0,0,0.8)"
              />
            </svg>

            {/* Glowing windows effect */}
            <div className="absolute bottom-0 left-0 right-0 h-full">
              <div className="h-full w-full flex items-end">
                <div className="grid grid-cols-12 gap-1 w-full pb-4">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 w-1 rounded-full bg-yellow-300 opacity-0 animate-window-glow`}
                      style={{
                        animationDelay: `${Math.random() * 5}s`,
                        marginBottom: `${Math.floor(Math.random() * 150)}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white leading-tight">
              Find Your Dream Home
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100/90 font-light max-w-3xl mx-auto leading-relaxed">
              Discover the perfect property that matches your lifestyle and
              aspirations in prime locations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group"
              >
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Search Properties
                <ChevronRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/properties"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Featured Listings
              </Link>
            </div>
          </div>

          {/* Property search form with animation */}
          <div
            className={`mt-12 max-w-4xl mx-auto transition-all duration-500 ease-in-out transform ${isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}`}
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <PropertySearchForm compact={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Featured Properties
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Exceptional Homes Awaiting You
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked selection of premium properties that offer
              exceptional value and features
            </p>
          </div>
          <Link
            to="/properties"
            className="mt-6 md:mt-0 group inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
          >
            View all properties
            <ChevronRightIcon className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Popular Locations Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Popular Locations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Discover Prime Locations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore properties in these sought-after locations with thriving
              communities and amenities
            </p>
          </div>

          {/* Enhanced Locations Grid - Modern Design without Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.slice(0, 4).map((location, index) => {
              // Generate unique colors for each location
              const colors = [
                [
                  "from-blue-600 to-indigo-700",
                  "bg-blue-600/10",
                  "border-blue-600/20",
                ],
                [
                  "from-purple-600 to-indigo-600",
                  "bg-purple-600/10",
                  "border-purple-600/20",
                ],
                [
                  "from-cyan-500 to-blue-600",
                  "bg-cyan-500/10",
                  "border-cyan-500/20",
                ],
                [
                  "from-indigo-600 to-purple-700",
                  "bg-indigo-600/10",
                  "border-indigo-600/20",
                ],
              ];

              const [gradientColor, bgColor, borderColor] =
                colors[index % colors.length];

              return (
                <Link
                  key={location.id}
                  to={`/properties?location=${location.name}`}
                  className="group block"
                >
                  <div
                    className={`relative h-72 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-xl ${bgColor} border ${borderColor} group-hover:scale-[1.02] transform-gpu`}
                  >
                    {/* Abstract background pattern */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient
                            id={`gradient-${location.id}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              className={`${gradientColor.split(" ")[0]}`}
                            />
                            <stop
                              offset="100%"
                              className={`${gradientColor.split(" ")[1]}`}
                            />
                          </linearGradient>
                          <pattern
                            id={`pattern-${location.id}`}
                            width="10"
                            height="10"
                            patternUnits="userSpaceOnUse"
                          >
                            <circle
                              cx="5"
                              cy="5"
                              r="1.5"
                              fill={`url(#gradient-${location.id})`}
                            />
                          </pattern>
                        </defs>
                        <rect
                          width="100%"
                          height="100%"
                          fill={`url(#pattern-${location.id})`}
                        />
                      </svg>
                    </div>

                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl p-[1px] overflow-hidden">
                      <div
                        className={`absolute -inset-[10%] bg-gradient-to-r ${gradientColor} opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500`}
                      />
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <MapPinIcon
                        className={`h-6 w-6 text-gradient-to-r ${gradientColor}`}
                      />
                    </div>

                    {/* Large decorative letter */}
                    <div className="absolute -right-6 -bottom-6 text-[120px] font-black opacity-10 select-none">
                      {location.name.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-2 text-gray-900">
                          {location.name}
                        </h3>

                        <div className="flex items-center mb-3 text-gray-700">
                          <MapPinIcon className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">
                            {location.type}
                          </span>
                        </div>

                        {/* Explore button */}
                        <div
                          className={`mt-4 inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${gradientColor} text-white opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 transform-gpu`}
                        >
                          Explore properties
                          <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section - Modernized */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding your dream property is easy with our simple three-step
              process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100" />

            {/* Step 1 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                <MagnifyingGlassIcon className="h-8 w-8" />
              </div>
              <div className="pt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Search</h3>
                <p className="text-gray-600">
                  Browse our extensive collection of properties using our
                  advanced search filters to find exactly what you're looking
                  for.
                </p>
                <div className="mt-6 text-blue-600 font-medium flex items-center justify-center">
                  <span>Start searching</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                <HomeIcon className="h-8 w-8" />
              </div>
              <div className="pt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Tour</h3>
                <p className="text-gray-600">
                  Schedule viewings of your favorite properties at your
                  convenience, either in person or through our virtual tour
                  option.
                </p>
                <div className="mt-6 text-blue-600 font-medium flex items-center justify-center">
                  <span>Book a tour</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                <KeyIcon className="h-8 w-8" />
              </div>
              <div className="pt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Purchase
                </h3>
                <p className="text-gray-600">
                  Work with our experienced agents to negotiate the best deal
                  and complete your property purchase with ease.
                </p>
                <div className="mt-6 text-blue-600 font-medium flex items-center justify-center">
                  <span>Get started</span>
                  <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section - New */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied customers who found their dream homes
              through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
              <div className="absolute -top-5 -right-5">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "Finding our family home was a breeze with PropertyFinder. The
                search tools were intuitive, and our agent was incredibly
                helpful throughout the entire process."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">New York, NY</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
              <div className="absolute -top-5 -right-5">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "As a first-time homebuyer, I was nervous about the process.
                PropertyFinder made everything simple and transparent. I
                couldn't be happier with my new condo!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-xl mr-4">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jane Smith</h4>
                  <p className="text-sm text-gray-600">Chicago, IL</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative">
              <div className="absolute -top-5 -right-5">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                "We were looking for an investment property and needed specific
                features. The filtering options helped us narrow down exactly
                what we wanted. Highly recommend!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-xl mr-4">
                  RJ
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Robert Johnson
                  </h4>
                  <p className="text-sm text-gray-600">Austin, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Modernized */}
      <div className="relative py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700" />

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 800 800">
            <defs>
              <pattern
                id="pattern-circles"
                x="0"
                y="0"
                width="200"
                height="200"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Start your property search today and discover the perfect place to
              call home. Our experts are ready to help you every step of the
              way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/properties"
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Browse Properties
              </Link>
              {/* <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact an Agent
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
