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
                    u.email,
                    u.city,
                    u.job,
                    u.experiences,
                    u.image_url,
                    u.institute
                    
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
    

    const updateAkun = async (params) => {
        
            const sql = `
                UPDATE user 
                SET name = ?, city = ?, job = ?, image_url = ?, experiences = ?, institute = ?
                WHERE id = ?
            `;
        return query(sql, params);
    };
    
    

    const deleteAkun = async (id) => {
        try {
            const sql = "DELETE FROM user WHERE id = ?";
            const result = await query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error ("akun tidak ditemukan");
            }
            return {id, status:'deleted'};
        } catch (error) {
            throw new Error("Error menghapus akun: " + error.message);
        }
    }

    const getExistingImageUrl = async (id) => {
        try {
          const sql = "SELECT image_url FROM user WHERE id = ?";
          const result = await query(sql, [id]);
      
          // Periksa apakah data ditemukan
          if (result.length === 0) {
            throw new Error("Akun tidak ditemukan");
          }
      
          // Kembalikan URL gambar
          return result[0].image_url;
        } catch (error) {
          throw new Error("Error mendapatkan link image: " + error.message);
        }
      };
      

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

export {getAllAkun, getAkunById, getAkunByName, updateAkun, deleteAkun, getAkunByRole, getExistingImageUrl};