import axiosInstance from "./api";

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
