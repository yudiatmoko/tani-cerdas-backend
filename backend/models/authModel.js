import { query } from "../database/db.js";
import bcrypt from "bcrypt";

const getUserByEmail = async (email) => {
  try {
    const rows = await query("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching user by email: " + error.message);
  }
};

const createUser = async (name, email, password, role_id = 3) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryString =
      "INSERT INTO user (name, email, password, role_id) VALUES (?, ?, ?, ?)";
    await query(queryString, [name, email, hashedPassword, role_id]);
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

const getUserById = async (id) => {
  try {
    const rows = await query("SELECT * FROM user WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error.message);
  }
};

export {
  getUserByEmail,
  createUser,   
  comparePassword,
  getUserById
}