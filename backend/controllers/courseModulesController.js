import { validationResult } from "express-validator";
import { getCourseById } from "../models/courseModel.js";
import ModuleModel from "../models/moduleModel.js";
import CourseModuleModel from "../models/courseModulesModel.js";

const handleAddCourseModules = async (req, res) => {
  const { course_id, module_id } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseExists = await getCourseById(course_id);
    if (courseExists.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const moduleExists = await ModuleModel.getModuleById(module_id);
    if (moduleExists.length === 0) {
      return res.status(404).json({ message: "Module not found" });
    }

    const duplicateCheck =
      await CourseModuleModel.getCourseModuleByCourseAndModule(
        course_id,
        module_id
      );
    if (duplicateCheck) {
      return res.status(400).json({
        status: false,
        message: "This course already contains the specified module",
      });
    }

    await CourseModuleModel.addCourseModule(course_id, module_id);

    await CourseModuleModel.updateCourseModuleCount(course_id);

    return res.status(201).json({
      status: true,
      message: "Add course and modules successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetAllCourseModules = async (req, res) => {
  try {
    const result = await CourseModuleModel.getAllCourseModules();

    const groupedData = result.reduce((acc, row) => {
      const existingCourse = acc.find(
        (item) => item.course_id === row.course_id
      );
      if (existingCourse) {
        existingCourse.modules.push({ id: row.id, module_id: row.module_id });
      } else {
        acc.push({
          course_id: row.course_id,
          modules: [{ id: row.id, module_id: row.module_id }],
        });
      }
      return acc;
    }, []);

    return res.status(200).json({
      status: true,
      message: "List of course modules",
      data: groupedData,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetCourseModulesByCourseId = async (req, res) => {
  const course_id = req.params.id;
  try {
    const result = await CourseModuleModel.getCourseModulesByCourseId(
      course_id
    );

    if (result.length <= 0) {
      return res.status(404).json({
        status: false,
        message: "Course modules not found",
      });
    } else {
      const groupedData = result.reduce((acc, row) => {
        const existingCourse = acc.find(
          (item) => item.course_id === row.course_id
        );
        if (existingCourse) {
          existingCourse.modules.push({ id: row.id, module_id: row.module_id });
        } else {
          acc.push({
            course_id: row.course_id,
            modules: [{ id: row.id, module_id: row.module_id }],
          });
        }
        return acc;
      }, []);
      return res.status(200).json({
        status: true,
        message: "Course modules found",
        data: groupedData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleUpdateCourseModulesById = async (req, res) => {
  const id = req.params.id;
  const { course_id, module_id } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseModulesExists = await CourseModuleModel.getCourseModuleById(id);
    if (courseModulesExists.length === 0) {
      return res.status(404).json({ message: "Course Modules not found" });
    }

    const courseExists = await getCourseById(course_id);
    if (courseExists.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const moduleExists = await ModuleModel.getModuleById(module_id);
    if (moduleExists.length === 0) {
      return res.status(404).json({ message: "Module not found" });
    }

    const duplicateCheck =
      await CourseModuleModel.getCourseModuleByCourseAndModule(
        course_id,
        module_id
      );
    if (duplicateCheck) {
      return res.status(409).json({
        status: false,
        message: "This course already contains the specified module",
      });
    }

    await CourseModuleModel.updateCourseModuleById(id, course_id, module_id);

    await CourseModuleModel.updateCourseModuleCount(course_id);

    return res.status(200).json({
      status: true,
      message: "Course module updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleDeleteCourseModule = async (req, res) => {
  const id = req.params.id;

  try {
    const courseModule = await CourseModuleModel.getCourseModuleById(id);
    if (courseModule.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Course module not found",
      });
    }

    const course_id = courseModule[0].course_id;
    const result = await CourseModuleModel.deleteCourseModuleById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Course module not found",
      });
    }

    await CourseModuleModel.updateCourseModuleCount(course_id);

    return res.status(200).json({
      status: true,
      message: "Course module deleted successfully",
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
  handleAddCourseModules,
  handleGetAllCourseModules,
  handleGetCourseModulesByCourseId,
  handleUpdateCourseModulesById,
  handleDeleteCourseModule,
};
