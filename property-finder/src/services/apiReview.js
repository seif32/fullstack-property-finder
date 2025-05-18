import { API_BASE_URL, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Get all reviews
 */
export const getAllReviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get a specific review by ID
 * @param {number} id - Review ID
 */
export const getReviewById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Review not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching review ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all reviews for a specific property
 * @param {number} propertyId - Property ID
 */
export const getPropertyReviews = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reviews/property/${propertyId}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching reviews for property ${propertyId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all reviews by a specific user
 * @param {number} userId - User ID
 */
export const getUserReviews = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/user/${userId}`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching reviews by user ${userId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get review statistics for a property
 * @param {number} propertyId - Property ID
 */
export const getPropertyReviewStats = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reviews/property/${propertyId}/stats`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching review stats for property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get recent reviews
 * @param {number} limit - Number of reviews to fetch
 */
export const getRecentReviews = async (limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/reviews/recent?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching recent reviews:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Create a new review
 * @param {Object} reviewData - Review data
 */
export const createReview = async (reviewData) => {
  try {
    const token = localStorage.getItem("authToken");

    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating review:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Update an existing review
 * @param {number} id - Review ID
 * @param {Object} reviewData - Updated review data
 */
export const updateReview = async (id, reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating review ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a review
 * @param {number} id - Review ID
 */
export const deleteReview = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Review not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting review ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};
