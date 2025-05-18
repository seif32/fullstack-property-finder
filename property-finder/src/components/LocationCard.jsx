import { Link } from "react-router-dom";

function LocationCard({ location }) {
  // Generate a consistent color based on location name
  const getGradientColor = (name) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-emerald-500 to-teal-600",
      "from-violet-500 to-purple-600",
      "from-rose-500 to-pink-600",
      "from-amber-500 to-orange-600",
      "from-cyan-500 to-sky-600",
    ];

    // Simple hash function to get consistent color for same location
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const gradientClass = getGradientColor(location.name);

  return (
    <Link
      to={`/properties?location=${location.name}`}
      className="group block h-full no-underline text-inherit"
    >
      <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        {/* Decorative accent */}
        <div
          className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${gradientClass}`}
        />

        <div className="p-6">
          {/* Location icon with gradient background */}
          <div
            className={`w-12 h-12 rounded-lg mb-4 flex items-center justify-center bg-gradient-to-br ${gradientClass} text-white shadow-sm`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>

          {/* Location name with hover effect */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {location.name}
          </h3>

          {/* Location type with modern icon */}
          <div className="flex items-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
              <circle cx="12" cy="10" r="1" />
            </svg>
            <span className="ml-2 text-sm font-medium text-gray-600">
              {location.type}
            </span>
          </div>

          {/* Sub-locations count with building icon */}
          {location.subLocations && location.subLocations.length > 0 && (
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                <line x1="12" y1="6" x2="12" y2="6" />
                <line x1="12" y1="12" x2="12" y2="12" />
                <line x1="12" y1="18" x2="12" y2="18" />
              </svg>
              <span className="ml-2 text-sm font-medium text-gray-600">
                {location.subLocations.length}{" "}
                {location.subLocations.length === 1 ? "area" : "areas"}
              </span>
            </div>
          )}

          {/* Description with truncation */}
          {location.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-2">
              {location.description}
            </p>
          )}

          {/* Explore button/indicator */}
          <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
            Explore properties
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default LocationCard;
