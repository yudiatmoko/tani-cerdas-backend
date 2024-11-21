import { query } from "../database/db.js";

const getAllCourses = async () => {
  return query("SELECT * FROM course");
};

const getCourseById = async (id) => {
  return query("SELECT * FROM course WHERE id = ?", [id]);
};

const getCourseByTitle = async (title) => {
  return query("SELECT * FROM course WHERE title = ?", [title]);
};

const addCourse = async (params) => {
  const sql = `
    INSERT INTO course (title, description, video_url, image_url, duration, level, contributor_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  return query(sql, params);
};

const updateCourse = async (params) => {
  const sql = `
    UPDATE course 
    SET title = ?, description = ?, video_url = ?, image_url = ?, duration = ?, level = ?
    WHERE id = ?
  `;
  return query(sql, params);
};

const deleteCourse = async (id) => {
  return query("DELETE FROM course WHERE id = ?", [id]);
};

export {
  getAllCourses,
  getCourseById,
  getCourseByTitle,
  addCourse,
  updateCourse,
  deleteCourse,
};
