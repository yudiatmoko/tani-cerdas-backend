import { validationResult } from "express-validator";
import moduleModel from "../models/moduleModel.js";

const handleGetAllModules = async (req, res) => {
  try {
    const rows = await moduleModel.getAllModulesWithSubmodules();

    const modules = rows.reduce((result, row) => {
      const moduleId = row.module_id;

      if (!result[moduleId]) {
        result[moduleId] = {
          id: moduleId,
          title: row.module_title,
          submodules_num: row.submodules_num,
          created_at: row.module_created_at,
          updated_at: row.module_updated_at,
          submodules: [],
        };
      }

      if (row.submodule_id) {
        result[moduleId].submodules.push({
          id: row.submodule_id,
          title: row.submodule_title,
          content: row.submodule_content,
          created_at: row.submodule_created_at,
          updated_at: row.submodule_updated_at,
        });
      }

      return result;
    }, {});

    const modulesArray = Object.values(modules);

    return res.status(200).json({
      status: true,
      message: "List of modules with submodules",
      data: modulesArray,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleAddModule = async (req, res) => {
  const { title, submodules } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingModule = await moduleModel.getModuleByTitle(title);
    if (existingModule.length > 0) {
      return res.status(400).json({ message: "Module already exist" });
    }

    await moduleModel.addModule(title, submodules);
    return res.status(201).json({
      status: true,
      message: "Module created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleGetModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const rows = await moduleModel.getModuleById(id);

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: `Module not found`,
      });
    }

    const moduleData = rows.reduce(
      (result, row) => {
        if (row.submodule_id) {
          result.submodules.push({
            id: row.submodule_id,
            title: row.submodule_title,
            content: row.submodule_content,
            created_at: row.submodule_created_at,
            updated_at: row.submodule_updated_at,
          });
        }
        return result;
      },
      {
        id: rows[0].module_id,
        title: rows[0].module_title,
        submodules_num: rows[0].submodules_num,
        created_at: rows[0].module_created_at,
        updated_at: rows[0].module_updated_at,
        submodules: [],
      }
    );

    return res.status(200).json({
      status: true,
      message: "Module with submodules",
      data: moduleData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const handleUpdateModuleById = async (req, res) => {
  const moduleId = req.params.id;
  const { title, submodules } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const rows = await moduleModel.getModuleById(moduleId);

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: `Module not found`,
      });
    }

    await moduleModel.updateModuleById(moduleId, title, submodules);

    return res.status(200).json({
      status: true,
      message: "Module and submodules updated successfully",
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

const handleDeleteModuleById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await moduleModel.deleteModuleById(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Module not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Module deleted successfully",
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
  handleGetAllModules,
  handleAddModule,
  handleGetModuleById,
  handleUpdateModuleById,
  handleDeleteModuleById,
};
