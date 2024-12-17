import axiosInstance from "./api";

// Fetch all events
export const fetchEvents = async (token) => {
    try {
        const response = await axiosInstance.get("/Events", {
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

// Add a new event
export const addEvent = async (eventData, token) => {
    try {
        const response = await axiosInstance.post("/Events", eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding event:", error);
        throw error;
    }
};

// Update an event by ID
export const updateEvent = async (id, eventData, token) => {
    if (!token) throw new Error("Token tidak ditemukan. Pastikan Anda telah login.");
    if (!id) throw new Error("ID event tidak ditemukan.");
    if (!eventData) throw new Error("Data event tidak valid.");

    try {
        const response = await axiosInstance.put(`/events/${id}`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            throw new Error("Token tidak valid atau telah kedaluwarsa. Silakan login kembali.");
        }
        console.error("Error updating event:", error);
        throw new Error(error.response?.data?.message || error.message || "Gagal memperbarui event.");
    }
};

// Fetch event by ID
export const fetchEventById = async (id, token) => {
    try {
        const response = await axiosInstance.get(`/Events/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching event by ID:", error);
        throw error;
    }
};

// Delete an event by ID
export const deleteEvent = async (id, token) => {
    try {
        const response = await axiosInstance.delete(`/events/${id}`, {
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
