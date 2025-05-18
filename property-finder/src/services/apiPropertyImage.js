import { API_BASE_URL, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Get all images for a property
 * @param {number} propertyId - Property ID
 */
export const getPropertyImages = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/property-images/property/${propertyId}`
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "No images found for this property"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching images for property ${propertyId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get the primary image for a property
 * @param {number} propertyId - Property ID
 */
export const getPrimaryImage = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/property-images/property/${propertyId}/primary`
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "No primary image found for this property"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching primary image for property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all non-primary images for a property
 * @param {number} propertyId - Property ID
 */
export const getNonPrimaryImages = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/property-images/property/${propertyId}/non-primary`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching non-primary images for property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Add a new image to a property
 * @param {Object} imageData - Image data
 */
export const addPropertyImage = async (imageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property-images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding property image:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Update an existing property image
 * @param {number} imageId - Image ID
 * @param {Object} imageData - Updated image data
 */
export const updatePropertyImage = async (imageId, imageData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property-images/${imageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(imageData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating image ${imageId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Set an image as the primary image for a property
 * @param {number} imageId - Image ID
 */
export const setPrimaryImage = async (imageId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/property-images/${imageId}/set-primary`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Image not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully set as primary
  } catch (error) {
    console.error(`Error setting image ${imageId} as primary:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a property image
 * @param {number} imageId - Image ID
 */
export const deletePropertyImage = async (imageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property-images/${imageId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Image not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting image ${imageId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete all images for a property
 * @param {number} propertyId - Property ID
 */
export const deleteAllPropertyImages = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/property-images/property/${propertyId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return true; // Successfully deleted all images
  } catch (error) {
    console.error(
      `Error deleting all images for property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};
