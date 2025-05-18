import { API_BASE_URL } from "../constants/apiConstants";

export async function createViewingRequest(viewingRequestData) {
  const url = `${API_BASE_URL}/viewing-requests`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(viewingRequestData),
    });

    const result = await response.json().catch((jsonError) => {
      console.error("[ERROR] Failed to parse response JSON:", jsonError);
      throw new Error("Invalid JSON response from server");
    });

    if (!response.ok) {
      console.error("[ERROR] Server responded with error:", result);
      throw new Error(result.message || "Failed to create viewing request");
    }

    return result;
  } catch (error) {
    console.error("[EXCEPTION] createViewingRequest failed:", error);
    throw error;
  }
}

export async function getViewingRequestsByAgent(agentId) {
  const response = await fetch(
    `${API_BASE_URL}/viewing-requests/agent/${agentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch viewing requests for agent");
  }

  return await response.json();
}

export async function updateViewingRequestStatus({ requestId, status }) {
  const url = `${API_BASE_URL}/viewing-requests/${requestId}`;
  const payload = { status };

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Add Authorization if needed:
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch((err) => {
      console.error("[DEBUG] Failed to parse JSON:", err);
      throw new Error("Failed to parse response JSON");
    });

    if (!response.ok) {
      console.error("[ERROR] API responded with error:", result);
      throw new Error(
        result.message || "Failed to update viewing request status"
      );
    }

    console.log("[DEBUG] Successfully updated status:", result);
    return result;
  } catch (error) {
    console.error("[EXCEPTION] updateViewingRequestStatus failed:", error);
    throw error;
  }
}
