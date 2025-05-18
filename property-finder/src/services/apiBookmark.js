import { API_BASE_URL, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Get all bookmarks
 */
export const getAllBookmarks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get a specific bookmark by ID
 * @param {number} id - Bookmark ID
 */
export const getBookmarkById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Bookmark not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching bookmark ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all bookmarks for a specific user
 * @param {number} userId - User ID
 */
export const getUserBookmarks = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/user/${userId}`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching bookmarks for user ${userId}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get all bookmarks for a specific property
 * @param {number} propertyId - Property ID
 */
export const getPropertyBookmarks = async (propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookmarks/property/${propertyId}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching bookmarks for property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Check if a property is bookmarked by a user
 * @param {number} userId - User ID
 * @param {number} propertyId - Property ID
 */
export const checkBookmark = async (userId, propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookmarks/check/${userId}/${propertyId}`
    );

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Error checking bookmark for user ${userId} and property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Create a new bookmark
 * @param {Object} bookmarkData - Bookmark data
 */
export const createBookmark = async (bookmarkData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookmarkData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a bookmark by ID
 * @param {number} id - Bookmark ID
 */
export const deleteBookmark = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Bookmark not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting bookmark ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a bookmark by user and property combination
 * @param {number} userId - User ID
 * @param {number} propertyId - Property ID
 */
export const deleteBookmarkByUserAndProperty = async (userId, propertyId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bookmarks/user/${userId}/property/${propertyId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Bookmark not found"
          : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(
      `Error deleting bookmark for user ${userId} and property ${propertyId}:`,
      error
    );
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};
