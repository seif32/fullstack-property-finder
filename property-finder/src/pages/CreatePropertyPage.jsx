"use client";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PropertyForm from "../components/PropertyForm";
import { useAuth } from "../auth/AuthContext";
import { useCreateProperty } from "../hooks/property/useCreateProperty";

function CreatePropertyPage() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { mutate: createProperty, isPending } = useCreateProperty();

  const handleSubmit = (data) => {
    const propertyData = {
      ...data,
      ownerId: user.id,
      ownerName: `${user.firstName} ${user.lastName}`,
    };

    createProperty(propertyData);
    navigate("/my-properties");
  };

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
                to="/my-properties"
                className="ml-1 text-gray-700 hover:text-black md:ml-2"
              >
                My Properties
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
                Create New Property
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Create New Property
      </h1>
      <p className="text-gray-600 mb-8">
        Fill in the details below to list your property on our platform.
      </p>

      <div className="mt-6">
        <PropertyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default CreatePropertyPage;
