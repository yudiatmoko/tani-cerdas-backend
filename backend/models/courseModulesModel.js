import { query } from "../database/db.js";

const getCourseModuleByCourseAndModule = async (courseId, moduleId) => {
  const result = await query(
    "SELECT id FROM course_modules WHERE course_id = ? AND module_id = ?",
    [courseId, moduleId]
  );
  return result.length > 0;
};

const addCourseModule = async (courseId, moduleId) => {
  const result = await query(
    "INSERT INTO course_modules (course_id, module_id) VALUES (?, ?)",
    [courseId, moduleId]
  );
  return result;
};

const getAllCourseModules = async () => {
  const result = await query(
    "SELECT id, course_id, module_id FROM course_modules"
  );
  return result;
};

const getCourseModulesByCourseId = async (courseId) => {
  const result = await query(
    "SELECT id, course_id, module_id FROM course_modules WHERE course_id = ?",
    [courseId]
  );
  return result;
};

const updateCourseModuleById = async (id, courseId, moduleId) => {
  const result = await query(
    "UPDATE course_modules SET course_id = ?, module_id = ? WHERE id = ?",
    [courseId, moduleId, id]
  );
  return result;
};

const getCourseModuleById = async (id) => {
  return query("SELECT * FROM course_modules WHERE id = ?", [id]);
}

const deleteCourseModuleById = async (id) => {
  const result = await query("DELETE FROM course_modules WHERE id = ?", [id]);
  return result;
};

const updateCourseModuleCount = async (courseId) => {
  const result = await query(
    `UPDATE course 
     SET modules_num = (
       SELECT COUNT(*) 
       FROM course_modules 
       WHERE course_id = ?
     ) 
     WHERE id = ?`,
    [courseId, courseId]
  );
  return result;
};

export default {
  getCourseModuleByCourseAndModule,
  addCourseModule,
  getAllCourseModules,
  getCourseModulesByCourseId,
  updateCourseModuleById,
  deleteCourseModuleById,
  updateCourseModuleCount,
  getCourseModuleById
};
