"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/dummyData";
import AgentProfile from "../components/AgentProfile";
import PropertyCard from "../components/PropertyCard";

// Dummy agent data
const dummyAgent = {
  id: 1,
  firstName: "Ahmed",
  lastName: "Hassan",
  email: "ahmed.hassan@example.com",
  phoneNumber: "+20 123 456 7890",
  location: "Cairo, Egypt",
  bio: "Ahmed is a seasoned real estate professional with over 10 years of experience in the Egyptian property market. Specializing in luxury properties and investment opportunities, Ahmed has helped hundreds of clients find their dream homes and make sound investment decisions. His deep knowledge of the local market and commitment to client satisfaction have earned him a reputation as one of the top agents in the region.",
  rating: 4.8,
  reviewCount: 124,
  propertiesCount: 15,
  specialization: "Luxury Properties",
  experience: 10,
  profileImage: "/professional-real-estate-agent.png",
};

function AgentProfilePage() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch agent details and properties
    const fetchAgentData = () => {
      setLoading(true);
      setTimeout(() => {
        // In a real app, you would fetch the agent by ID
        setAgent(dummyAgent);

        // Filter properties by owner ID
        const ownerProperties = properties.filter(
          (property) => property.ownerId === 1
        );
        setAgentProperties(ownerProperties);

        setLoading(false);
      }, 500);
    };

    fetchAgentData();
  }, [id]);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  // Filter properties based on tab
  const filteredProperties =
    tabValue === 0
      ? agentProperties
      : tabValue === 1
        ? agentProperties.filter((p) => p.listingType === "Sale")
        : agentProperties.filter((p) => p.listingType === "Rent");

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
        <h2 className="text-xl font-medium mt-4">Loading agent profile...</h2>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Agent not found</h2>
        <Link to="/" className="text-black hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

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
                to="/agents"
                className="ml-1 text-gray-700 hover:text-black md:ml-2"
              >
                Agents
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
                {agent.firstName} {agent.lastName}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <AgentProfile agent={agent} />

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {agent.firstName}'s Properties
        </h2>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange(0)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tabValue === 0
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => handleTabChange(1)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tabValue === 1
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => handleTabChange(2)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                tabValue === 2
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              For Rent
            </button>
          </nav>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No properties found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentProfilePage;
