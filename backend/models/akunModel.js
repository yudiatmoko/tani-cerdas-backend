import { query } from "../database/db.js";


    const getAllAkun = async() => {
        try {
            const sql = await query(`
            SELECT    
                u.id,
                u.name,
                u.email,
                r.title AS role  -- Menambahkan koma setelah kolom email dan memilih id role
            FROM
                user u
            LEFT JOIN roles r ON u.role_id = r.id;
 
            `);

            return sql;
        } catch (error) {
            throw new Error("fetching akun error: " + error.message);
        }
    };

    const getAkunById = async (id) => {
        try {
            const sql =`
                SELECT
                    u.id,
                    u.name,
                    u.email
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
    }

    const getAkunByName = async (name) => {
        try {
            const sql = `
                SELECT u.id, u.name, u.email
                FROM user u
                WHERE u.name = ?`;
            const rows = await query(sql, [name]); // eksekusi query dengan nama yang diterima sebagai parameter
    
            if (rows.length === 0) {
                throw new Error("Akun dengan nama tersebut tidak ada");
            }
    
            return rows[0];
        } catch (error) {
            throw new Error("Error menampilkan akun dengan Nama: " + error.message);
        }
    };
    

    const updateAkunFields = async (id, fields) => {
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
    };

    const deleteAkun = async (id) => {
        try {
            const sql = "DELETE FROM akun WHERE id = ?";
            const result = await query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error ("akun tidak ditemukan");
            }
            return {id, status:'deleted'};
        } catch (error) {
            throw new Error("Error menghapus akun: " + error.message);
        }
    }

    const getAkunByRole = async (role_id) => {
        try {
            const sql =`
            SELECT
                u.id,
                u.name,
                u.email,
                u.experiences
            FROM
                user u
            LEFT JOIN roles r ON u.role_id = r.id
            WHERE r.id = 2`
            ;
            const rows = await query (sql, [role_id]);
            return rows;
        } catch (error) {
            throw new Error("Error menampilkan data berdasarkan role: " + error.message);
        }
    }

export {getAllAkun, getAkunById, getAkunByName, updateAkunFields, deleteAkun, getAkunByRole};