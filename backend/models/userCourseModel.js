import { query } from "../database/db.js";

const UserCourseModel = {
  addUserCourse: async (user_id, course_id) => {
    const sql = `INSERT INTO user_courses (user_id, course_id, is_complete, completed_at) VALUES (?, ?, ?, ?)`;
    const params = [user_id, course_id, false, null];
    return await query(sql, params);
  },

  getAllUserCourses: async () => {
    return await query("SELECT id, user_id, course_id FROM user_courses");
  },

  getUserCoursesByUserId: async (user_id) => {
    const result = await query(
      `
      SELECT 
        user_courses.id,
        user_courses.is_complete,
        user_courses.testimonials,
        user_courses.completed_at,
        course.id AS course_id,
        course.title AS course_title
      FROM 
        user_courses
      JOIN 
        course 
      ON 
        user_courses.course_id = course.id
      WHERE 
        user_courses.user_id = ?
      `,
      [user_id]
    );
    console.log(result);

    return result;
  },

  updateUserCourse: async (
    user_id,
    course_id,
    is_complete,
    testimonials,
    completed_at
  ) => {
    const sql = `UPDATE user_courses SET is_complete = ?, testimonials = ?, completed_at = ? WHERE course_id = ? AND user_id = ?`;
    const params = [
      is_complete,
      testimonials,
      completed_at,
      course_id,
      user_id,
    ];
    return await query(sql, params);
  },

  deleteUserCourse: async (user_id, course_id) => {
    const sql = `DELETE FROM user_courses WHERE course_id = ? AND user_id = ?`;
    const params = [course_id, user_id];
    return await query(sql, params);
  },

  checkExistEnrollment: async (course_id, user_id) => {
    return await query(
      "SELECT id FROM user_courses WHERE course_id = ? AND user_id = ?",
      [course_id, user_id]
    );
  },
};

export default UserCourseModel;
