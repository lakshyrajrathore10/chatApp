import API_BASE_URL from "../config";

const sendMessage = async (username, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to send message");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch messages");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { sendMessage, fetchMessages };
