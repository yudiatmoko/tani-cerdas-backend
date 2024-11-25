import { validationResult } from "express-validator";
import { getCourseById } from "../models/courseModel.js";
import { getUserById } from "../models/authModel.js";
import UserCourseModel from "../models/userCourseModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env file.");
}

const handleAddUserCourses = async (req, res) => {
  const { user_id, course_id } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseExists = await getCourseById(course_id);
    if (courseExists.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const userExists = await getUserById(user_id);
    if (userExists.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const duplicateCheck = await UserCourseModel.checkExistEnrollment(
      course_id,
      user_id
    );
    if (duplicateCheck.length > 0) {
      return res.status(409).json({
        status: false,
        message: "User already enrolled in this course",
      });
    }

    await UserCourseModel.addUserCourse(user_id, course_id);
    return res.status(201).json({
      status: true,
      message: "Course added to user successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetAllUserCourses = async (req, res) => {
  try {
    const result = await UserCourseModel.getAllUserCourses();

    const groupedData = result.reduce((acc, row) => {
      const exsistingUser = acc.find((item) => item.user_id === row.user_id);
      if (exsistingUser) {
        exsistingUser.courses.push({ id: row.id, course_id: row.course_id });
      } else {
        acc.push({
          user_id: row.user_id,
          courses: [{ id: row.id, course_id: row.course_id }],
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: true,
      message: "List of user courses",
      data: groupedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetUserCoursesByUserId = async (req, res) => {
  const user_id = req.params.id;
  try {
    const courses = await UserCourseModel.getUserCoursesByUserId(user_id);

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this user" });
    } else {
      return res.status(200).json({
        status: true,
        message: "List of user courses",
        data: courses,
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

const handleUpdateUserCourseByUserAndCourse = async (req, res) => {
  const course_id = req.params.id;
  const { is_complete, testimonials } = req.body;

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  const user_id = decoded.id;

  try {
    const userCourse = await UserCourseModel.checkExistEnrollment(
      user_id,
      course_id
    );

    if (!userCourse) {
      return res.status(404).json({ message: "Data not found" });
    }

    let completedAt = userCourse.completed_at;
    if (is_complete && !userCourse.is_complete) {
      completedAt = new Date();
    }

    const result = await UserCourseModel.updateUserCourse(
      user_id,
      course_id,
      is_complete,
      testimonials,
      completedAt
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    return res.status(200).json({
      status: true,
      message: "User course updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleDeleteUserCourseByUserAndCourse = async (req, res) => {
  const course_id = req.params.id;
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user_id = decoded.id;

    const [userCourse] = await UserCourseModel.checkExistEnrollment(
      course_id,
      user_id
    );

    if (!userCourse) {
      return res.status(404).json({ message: "Data not found" });
    }

    await UserCourseModel.deleteUserCourse(user_id, course_id);
    return res.status(200).json({
      status: true,
      message: "User course deleted successfully",
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
  handleAddUserCourses,
  handleGetAllUserCourses,
  handleGetUserCoursesByUserId,
  handleUpdateUserCourseByUserAndCourse,
  handleDeleteUserCourseByUserAndCourse,
};
