import { API_BASE_URL, ERROR_MESSAGES } from "../constants/apiConstants";

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Get a specific user by ID
 * @param {number} id - User ID
 */
export const getUserById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "User not found" : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Create a new user
 * @param {Object} userData - User data
 */
export const createUser = async (userData, token) => {
  try {
    console.log("[createUser] Called with data:", userData);
    console.log("[createUser] Using token:", token);

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    console.log("[createUser] Response status:", response.status);

    // Log raw response if it's not OK
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[createUser] Failed response body:", errorText);

      let parsedError = {};
      try {
        parsedError = JSON.parse(errorText);
      } catch (_) {
        parsedError.message = errorText || "Server error";
      }

      throw new Error(parsedError?.message || "Server error");
    }

    const data = await response.json();
    console.log("[createUser] User created successfully:", data);

    return data;
  } catch (error) {
    console.error("[createUser] Error occurred:", error.message);
    throw error;
  }
};

/**
 * Update an existing user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Delete a user
 * @param {number} id - User ID
 */
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "User not found" : ERROR_MESSAGES.SERVER_ERROR
      );
    }

    return true; // Successfully deleted
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

/**
 * Change user password
 * @param {number} id - User ID
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 */
export const changePassword = async (id, currentPassword, newPassword) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${id}/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || ERROR_MESSAGES.SERVER_ERROR);
    }

    return true; // Successfully changed password
  } catch (error) {
    console.error(`Error changing password for user ${id}:`, error);
    throw error.message || ERROR_MESSAGES.DEFAULT;
  }
};

// apiUser.js
export const getCurrentUser = async (token) => {
  try {
    console.log("[getCurrentUser] Called with token:", token);

    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[getCurrentUser] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[getCurrentUser] Failed response body:", errorText);
      throw new Error(`Failed to fetch current user: ${response.status}`);
    }

    const data = await response.json();
    console.log("[getCurrentUser] User data received:", data);

    return data;
  } catch (error) {
    console.error("[getCurrentUser] Error occurred:", error.message);
    throw error;
  }
};

// src/services/apiUser.js
export const promoteUserToAgent = async (id) => {
  const res = await fetch(`${API_BASE_URL}/users/${id}/role?role=AGENT`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to promote user");
  }

  return await res.json();
};
