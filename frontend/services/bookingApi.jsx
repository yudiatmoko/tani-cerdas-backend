import axiosInstance from "./api";

export const fetchData = async (token) => {
    try {
        const response = await axiosInstance.get("/booking", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching data booking:", error);
        throw error;
    }
};

export const addBooking = async (bookingData, token) => {
    try {
        const response = await axiosInstance.post("/booking", bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data;
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

export const updateBookingStatus = async (id, bookingData, token) => {
    if (!token) throw new Error("Token tidak ditemukan. Pastikan Anda telah login.");
    if (!id) throw new Error("ID booking tidak ditemukan.");
    if (!bookingData) throw new Error("Data booking tidak valid.");
  
    try {
      const response = await axiosInstance.put(`/booking/${id}/status`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return response data
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("Token tidak valid atau telah kedaluwarsa. Silakan login kembali.");
      }
      console.error("Error updating booking status:", error);
      throw new Error(error.response?.data?.message || error.message || "Gagal memperbarui status booking.");
    }
  };
  

export const fetchBookingById = async (id, token) => {
    try {
        const response = await axiosInstance.get(`/booking/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data
    } catch (error) {
        console.error("Error fetching booking by ID:", error);
        throw error;
    }
};

export const deleteBooking = async (id, token) => {
    try {
        const response = await axiosInstance.delete(`/booking/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data
    } catch (error) {
      console.error("Error deleting booking by ID:", error);
      throw error;          
    }
};