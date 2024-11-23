import axiosInstance from "./api";

export const fetchData = async (token) => {
  try {
    const response = await axiosInstance.get("/course", {
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

export const addCourse = async (courseData, token) => {
  try {
    const response = await axiosInstance.post("/course", courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const updateCourse = async (id, formData, token) => {
  try {
    const response = await axiosInstance.put(`/course/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

export const fetchCourseById = async (id, token) => {
  try {
    const response = await axiosInstance.get(`/course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

export const deleteCourse = async (id, token) => {
  try {
    const response = await axiosInstance.delete(`/course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting course by ID:", error);
    throw error;
  }
};
