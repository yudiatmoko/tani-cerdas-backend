import { query } from "../database/db.js";
import { validationResult } from "express-validator";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../models/courseModel.js";

const handleAddCourse = async (req, res) => {
  const { title, description, video_url, image_url, duration, level } =
    req.body;

  const contributorId = req.user.id;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingCourse = await query(
      "SELECT * FROM course WHERE title = ?",
      title
    );

    if (existingCourse.length > 0) {
      return res.status(400).json({ message: "Course already exist" });
    }

    const params = [
      title,
      description,
      video_url,
      image_url,
      duration,
      level,
      contributorId,
    ];
    await addCourse(params);
    return res.status(201).json({
      status: true,
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetAllCourses = async (req, res) => {
  try {
    const rows = await getAllCourses();
    return res.status(201).json({
      status: true,
      message: "List of courses",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const rows = await getCourseById(id);
    if (rows.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Course not found",
      });
    } else {
      return res.status(201).json({
        status: true,
        message: "Course found",
        data: rows,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleUpdateCourseById = async (req, res) => {
  const id = req.params.id;
  const { title, description, video_url, image_url, duration, level } =
    req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingCourse = await getCourseById(id);
    if (existingCourse.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const duplicateTitle = await query(
      "SELECT * FROM course WHERE title = ? AND id != ?",
      [title, id]
    );
    if (duplicateTitle.length > 0) {
      return res
        .status(400)
        .json({ message: "Course with this title already exists" });
    }

    const params = [
      title,
      description,
      video_url,
      image_url,
      duration,
      level,
      id,
    ];
    await updateCourse(params);
    return res.status(200).json({
      status: true,
      message: "Course updated successfully",
      data: { ...req.body },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleDeleteCourseById = async (req, res) => {
  const id = req.params.id;

  try {
    const existingCourse = await getCourseById(id);
    if (existingCourse.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    await deleteCourse(id);
    return res.status(201).json({
      status: true,
      message: "Delete data successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export {
  handleAddCourse,
  handleGetAllCourses,
  handleGetCourseById,
  handleUpdateCourseById,
  handleDeleteCourseById,
};
