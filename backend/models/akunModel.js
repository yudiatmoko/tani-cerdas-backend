import { query } from "../database/db.js";

const akunModel ={
    getAllAkun: async() => {
        return query("SELECT * FROM user")
    },

    getAkunById: async (id) => {
        try {
            const sql =`
                SELECT
                    u.id,
                    u.name,
                    u.email,
                    r.title
                FROM
                    user u
                LEFT JOIN roles r ON u.id = r.id
                WHERE u.id = ?
                `;
                const rows = await query (sql, [id]);

                if (rows.length === 0){
                    throw new Error("Akun tidak ditemukan")
                }

                return rows[0];
        } catch (error) {
            throw new Error ("Error menampilkan akun dengan ID: " + error.message);
        }
    },

    getAkunByName: async (name) => {
        try {
            const sql =`
                SELECT
                    u.id,
                    u.name,
                    u.email,
                    r.title
                FROM
                    user u
                LEFT JOIN roles r ON u.id = r.id
                WHERE u.name = ?
                `;
                const rows = await query (sql, [name]);

                if (rows.length === 0){
                    throw new Error("Akun dengan nama tersebut tidak ada")
                }

                return rows[0];
        } catch (error) {
            throw new Error ("Error menampilkan akun dengan Nama: " = error.message)
        }
    },

    updateAkunFields: async (id, fields) => {
        try {
            // Filter fields untuk hanya mengupdate kolom tertentu jika nilainya null
            const validFields = ['city', 'job', 'image_url', 'experience'];
            const setClause = validFields
                .filter(key => fields[key] !== undefined)
                .map(key => `${key} = ?`)
                .join(', ');

            if (!setClause) {
                throw new Error("Tidak ada field yang valid untuk diperbarui");
            }

            const values = validFields
                .filter(key => fields[key] !== undefined)
                .map(key => fields[key]);

            const sql = `
                UPDATE user
                SET ${setClause}
                WHERE id = ? AND (${validFields.map(key => `${key} IS NULL`).join(' OR ')})
            `;

            const result = await query(sql, [...values, id]);

            if (result.affectedRows === 0) {
                throw new Error("Tidak ada data yang diperbarui. Pastikan ID dan kondisi null sesuai.");
            }

            return { message: "Data berhasil diperbarui", updatedId: id };
        } catch (error) {
            throw new Error("Error memperbarui data akun: " + error.message);
        }
    },
};

export default akunModel;