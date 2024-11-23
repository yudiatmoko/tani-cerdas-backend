import axiosInstance from "./api";

export const fetchDataCourseModules = async (token) => {
  try {
    const response = await axiosInstance.get("/course-modules", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addCourseModules = async (courseModulesData, token) => {
  try {
    const response = await axiosInstance.post("/course-modules", courseModulesData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding modules to course:", error);
    throw error;
  }
};

export const updateCourseModules = async (id, courseModulesData, token) => {
  try {
    const response = await axiosInstance.put(`/course-modules/${id}`, courseModulesData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating module in course:", error);
    throw error;
  }
};

export const fetchCourseModulesById = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/course-modules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching module in course by ID:", error);
    throw error;
  }
};

export const deleteCourseModules = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/course-modules/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting module in course by ID:", error);
    throw error;
  }
};
