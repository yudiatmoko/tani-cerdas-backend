import mysql2 from "mysql2/promise";

const db = mysql2.createPool({
  host: "whqn7.h.filess.io",
  database: "tanicerdas_crysouthdo",
  port: "3307",
  user: "tanicerdas_crysouthdo",
  password: "cddbf402c3df4331b48b80ba7cb256de28c0b012"
});

async function testConnection() {
  try {
    await db.getConnection();
    console.log("Database connection success");
  } catch (error) {
    console.log("Database connection failed", error);
  }
}

async function query(command, values) {
  try {
    const [rows] = await db.query(command, values ?? []);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

export { testConnection, query };
