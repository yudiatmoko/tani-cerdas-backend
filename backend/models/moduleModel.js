import { query } from "../database/db.js";

const getAllModulesWithSubmodules = async () => {
  try {
    const sql = `
      SELECT 
        module.id AS module_id, 
        module.title AS module_title, 
        module.submodules_num,
        submodule.id AS submodule_id, 
        submodule.title AS submodule_title, 
        submodule.content AS submodule_content
      FROM module
      LEFT JOIN submodule ON module.id = submodule.module_id
    `;
    const rows = await query(sql);

    return rows;
  } catch (error) {
    throw error;
  }
};

const addModule = async (title, submodules) => {
  try {
    const result = await query("INSERT INTO module (title) VALUES (?)", [
      title,
    ]);
    const moduleId = result.insertId;

    for (const submodule of submodules) {
      const { title, content } = submodule;
      await query(
        `INSERT INTO submodule (title, content, module_id) VALUES (?, ?, ?)`,
        [title, content, moduleId]
      );
    }

    setSubmodulesNum(moduleId)
    return { moduleId, status: true };
  } catch (error) {
    throw error;
  }
};

const setSubmodulesNum = async (moduleId) => {
  await query(
    `UPDATE module 
    SET submodules_num = (
      SELECT COUNT(*) 
      FROM submodule 
      WHERE module_id = ?
    ) 
    WHERE id = ?`,
    [moduleId, moduleId]
  );
};

const getModuleById = async (id) => {
  try {
    const sql = `
      SELECT 
        module.id AS module_id, 
        module.title AS module_title, 
        module.submodules_num, 
        submodule.id AS submodule_id, 
        submodule.title AS submodule_title, 
        submodule.content AS submodule_content
      FROM module
      LEFT JOIN submodule ON module.id = submodule.module_id
      WHERE module.id = ?
    `;
    const rows = await query(sql, [id]);

    return rows;
  } catch (error) {
    throw error;
  }
};

const updateModuleById = async (moduleId, title, submodules) => {
  try {
    await query("UPDATE module SET title = ? WHERE id = ?", [title, moduleId]);

    for (const submodule of submodules) {
      const { id, title, content } = submodule;

      if (id) {
        await query(
          "UPDATE submodule SET title = ?, content = ? WHERE id = ? AND module_id = ?",
          [title, content, id, moduleId]
        );
      } else {
        await query(
          "INSERT INTO submodule (title, content, module_id) VALUES (?, ?, ?)",
          [title, content, moduleId]
        );
      }
    }
    return { status: true };
  } catch (error) {
    throw error;
  }
};

const deleteModuleById = async (id) => {
  try {
    const result = await query("DELETE FROM module WHERE id = ?", [id]);
    setSubmodulesNum(id)
    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  getAllModulesWithSubmodules,
  addModule,
  getModuleById,
  updateModuleById,
  deleteModuleById,
};
