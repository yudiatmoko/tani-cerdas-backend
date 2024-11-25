import axiosInstance from "./api";

// Mendapatkan semua data akun
export const fetchAllAkun = async () => {
    try {
        const response = await axiosInstance.get("/akun");
        return response.data.data; // Mengembalikan data akun
    } catch (error) {
        console.error("Error fetching all akun:", error);
        throw error;
    }
};

// Mendapatkan data akun berdasarkan ID
export const fetchAkunById = async (id, token) => {
    try {
        const response = await axiosInstance.get(`/akun/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data; // Mengembalikan data akun berdasarkan ID
    } catch (error) {
        console.error("Error fetching akun by ID:", error);
        throw error;
    }
};

// Mendapatkan data akun berdasarkan nama
export const fetchAkunByName = async (name, token) => {
    try {
        const response = await axiosInstance.get(`/akun/by-name?name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data; // Mengembalikan data akun berdasarkan nama
    } catch (error) {
        console.error("Error fetching akun by name:", error);
        throw error;
    }
};

// Memperbarui kolom tertentu pada akun (hanya untuk User dan Pakar)
export const updateAkunFields = async (id, akunData, token) => {
    try {
        const response = await axiosInstance.put(`/akun/${id}`, akunData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Mengembalikan pesan sukses dari server
    } catch (error) {
        console.error("Error updating akun fields:", error);
        throw error;
    }
};


