import { getAllCourses, getEducationById } from "../models/educationModel.js";

const handleGetAllCourses = async (req, res) => {
  try {
    const coursesData = await getAllCourses();

    if (coursesData.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    res.json(coursesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const handleGetEducationById = async (req, res) => {
  const courseId = req.params.id;

  try {
    const courseData = await getEducationById(courseId);

    res.json(courseData);
  } catch (error) {
    console.error(error);
    if (error.message === "Course not found") {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export { handleGetAllCourses, handleGetEducationById };
