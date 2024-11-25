import axiosInstance from "./api";

// Fetch all events
export const fetchData = async (token) => {
  try {
    const response = await axiosInstance.get("/event", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Add new event
export const addEvent = async (eventData, token) => {
  try {
    const response = await axiosInstance.post("/event", eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Update event
export const updateEvent = async (id, eventData, token) => {
  try {
    const response = await axiosInstance.put(`/event/${id}`, eventData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Fetch event by ID
export const fetchEventById = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data[0]; // Returning first event in case it's an array
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

// Delete event
export const deleteEvent = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/event/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting event by ID:", error);
    throw error;
  }
};
