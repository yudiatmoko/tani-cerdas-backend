import { query } from "../database/db.js";
import { validationResult } from "express-validator";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../models/courseModel.js";
import { deleteFile, deleteImageByFilename } from "../utils/file.js";

const handleAddCourse = async (req, res) => {
  const contributorId = req.user.id;
  const { title, description, video_url, duration, level } = req.body;
  const image_url = req.file;

  try {
    if (
      !image_url ||
      (image_url.mimetype !== "image/jpeg" &&
        image_url.mimetype !== "image/jpg" &&
        image_url.mimetype !== "image/png")
    ) {
      return res.status(400).json("Image type invalid!");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      deleteFile(image_url.path);
      return res.status(400).json({ errors: errors.array() });
    }

    const existingCourse = await query(
      "SELECT * FROM course WHERE title = ?",
      title
    );

    if (existingCourse.length > 0) {
      deleteFile(image_url.path);
      return res.status(400).json({ message: "Course already exists" });
    }

    const params = [
      title,
      description,
      video_url,
      image_url.filename,
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
    return res.status(200).json({
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
      return res.status(200).json({
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
  const { title, description, video_url, duration, level } = req.body;
  const image_url = req.file;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (image_url) deleteFile(image_url.path);
      return res.status(400).json({ errors: errors.array() });
    }

    const existingCourse = await getCourseById(id);
    if (existingCourse.length === 0) {
      if (image_url) deleteFile(image_url.path);
      return res.status(404).json({ message: "Course not found" });
    }

    const duplicateTitle = await query("SELECT * FROM course WHERE title = ?", [
      title,
    ]);
    if (duplicateTitle.length > 0) {
      if (image_url) deleteFile(image_url.path);
      return res
        .status(400)
        .json({ message: "Course with this title already exists" });
    }

    if (image_url) {
      deleteImageByFilename(existingCourse[0].image_url);
    }

    const params = [
      title,
      description,
      video_url,
      image_url ? image_url.filename : existingCourse[0].image_url,
      duration,
      level,
      id,
    ];
    await updateCourse(params);
    return res.status(200).json({
      status: true,
      message: "Course updated successfully",
      data: {
        ...req.body,
        image_url: image_url ? image_url.filename : existingCourse[0].image_url,
      },
    });
  } catch (error) {
    if (image_url) deleteFile(image_url.path);
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

    deleteImageByFilename(existingCourse[0].image_url);

    await deleteCourse(id);
    return res.status(200).json({
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
