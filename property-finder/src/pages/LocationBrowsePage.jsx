import { useState } from "react";
import { useGetAllLocations } from "../hooks/location/useGetAllLocations";
import LocationCard from "../components/LocationCard";
import LoadingSpinner from "../components/LoadingSpinner";

function LocationBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState("all");

  const { data: locations = [], isLoading } = useGetAllLocations();

  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleTabChange = (newValue) => setLocationType(newValue);

  if (isLoading) return <LoadingSpinner />;

  // Filter logic for main and sub-locations
  const filteredLocations = locations.filter((location) => {
    const matchesSearch = location.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      locationType === "all" || location.type.toLowerCase() === locationType;
    return matchesSearch && matchesType;
  });

  const filteredSubLocations = locations.flatMap((location) =>
    (location.subLocations || []).filter((subLocation) => {
      const matchesSearch = subLocation.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        locationType === "all" ||
        subLocation.type.toLowerCase() === locationType;
      return matchesSearch && matchesType;
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Browse Locations</h1>
      <p className="text-gray-600 mb-8">
        Explore properties by location to find your perfect neighborhood.
      </p>

      {/* Search Input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto">
          {["all", "city", "district", "neighborhood", "region"].map((type) => (
            <button
              key={type}
              onClick={() => handleTabChange(type)}
              className={`py-2 px-3 border-b-2 font-medium text-sm ${
                locationType === type
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </button>
          ))}
        </nav>
      </div>

      {/* Results */}
      {filteredLocations.length > 0 || filteredSubLocations.length > 0 ? (
        <>
          {filteredLocations.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Main Locations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredLocations.map((location) => (
                  <LocationCard key={location.id} location={location} />
                ))}
              </div>
            </>
          )}

          {filteredSubLocations.length > 0 && (
            <>
              {filteredLocations.length > 0 && (
                <div className="border-t border-gray-200 my-6" />
              )}
              <h2 className="text-2xl font-semibold mb-4">Sub Locations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubLocations.map((sub) => (
                  <LocationCard key={sub.id} location={sub} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-3">No locations found</h2>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default LocationBrowsePage;
