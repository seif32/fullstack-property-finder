import { API_BASE_URL, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Get all locations
 */
export const getAllLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get a specific location by ID
 * @param {number} id - Location ID
 */
export const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Location not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get locations by type
 * @param {string} type - Location type (e.g., 'City', 'Neighborhood', 'District')
 */
export const getLocationsByType = async (type) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/type/${type}`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching locations of type ${type}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get sub-locations for a parent location
 * @param {number} parentLocationId - Parent location ID
 */
export const getSubLocations = async (parentLocationId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/parent/${parentLocationId}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching sub-locations for parent ${parentLocationId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all root locations (without parent)
 */
export const getRootLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/root`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching root locations:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Search locations by name
 * @param {string} name - Location name to search for
 */
export const searchLocations = async (name) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/search?name=${encodeURIComponent(name)}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error searching locations with name ${name}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all neighborhoods in a city
 * @param {string} cityName - City name
 */
export const getCityNeighborhoods = async (cityName) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/city/${encodeURIComponent(cityName)}/neighborhoods`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching neighborhoods for city ${cityName}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get nearby locations based on coordinates
 * @param {number} latitude - Latitude
 * @param {number} longitude - Longitude
 * @param {number} radiusInKm - Radius in kilometers
 */
export const getNearbyLocations = async (
  latitude,
  longitude,
  radiusInKm = 5
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/nearby?latitude=${latitude}&longitude=${longitude}&radiusInKm=${radiusInKm}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching nearby locations:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Create a new location
 * @param {Object} locationData - Location data
 */
export const createLocation = async (locationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating location:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Update an existing location
 * @param {number} id - Location ID
 * @param {Object} locationData - Updated location data
 */
export const updateLocation = async (id, locationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating location ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Move a location under a new parent
 * @param {number} id - Location ID
 * @param {number} newParentId - New parent location ID
 */
export const moveLocation = async (id, newParentId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/${id}/move/${newParentId}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return true; // Successfully moved
  } catch (error) {
    console.error(
      `Error moving location ${id} to parent ${newParentId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a location
 * @param {number} id - Location ID
 */
export const deleteLocation = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Location not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting location ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};
