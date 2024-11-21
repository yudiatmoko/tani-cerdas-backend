import axiosInstance from "./api";

export const fetchData = async () => {
  try {
    const response = await axiosInstance.get("/module");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addModule = async (moduleData, token) => {
  try {
    const response = await axiosInstance.post("/module", moduleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding module:", error);
    throw error;
  }
};

export const updateModule = async (id, moduleData, token) => {
  try {
    const response = await axiosInstance.put(`/module/${id}`, moduleData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};

export const fetchModuleById = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/module/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching module by ID:", error);
    throw error;
  }
};

export const deleteModule = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/module/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting module by ID:", error);
    throw error;
  }
};
