import { query } from "../database/db.js";

const bookingModel = {

    addBooking: async (user_id, pakar_id, date, time) => {
        const sql = `INSERT INTO booking (user_id, pakar_id, date, time, status) VALUES(?, ?, ?, ?, ?)`;
        const params = [user_id, pakar_id, date, time, 'pending'];
        try {
            const result = await query(sql, params);
            console.log("Result of INSERT query:", result); // Tambahkan log untuk debugging
          } catch (error) {
            throw new Error("Tambah booking error: " + error.message);
          }
    },

    getAllBooking: async() => {
        try {
            const sql = `
            SELECT b.id, b.user_id, b.pakar_id, b.date, b.time, b.status,
                   u1.name AS user_name,
                   u2.name AS pakar_name
            FROM booking b
            JOIN user u1 ON b.user_id = u1.id
            JOIN user u2 ON b.pakar_id = u2.id
            WHERE u1.roles = 3
              AND u2.roles = 2
            `;
            const rows = await query(sql);
            return rows;
        } catch (error) {
            throw new Error("fetching booking error: " + error.message);
        }
    },

    getBookingById: async (id) => {
        try {
            const sql = `
            SELECT b.id, b.user_id, b.pakar_id, b.date, b.time, b.status,
                    u1.name AS user_name,
                    u2.name AS pakar_name
            FROM booking b
            JOIN user u1 ON b.user_id = u1.id
            JOIN user u2 ON b.pakar_id = u2.id
            WHERE u1.roles = 3
              AND u2.roles = 2
              AND b.id_booking = ?
            `;
            const rows = await query(sql, [id]);
            if (rows.length === 0){
                throw new Error("Booking tidak ditemukan")
            }
        } catch (error) {
            throw new Error ("Error menampilkann booking dengan ID: " + error.message);
        }
    },

    updateBookingStatus: async (id, status) => {
        try {
            const sql = "UPDATE booking SET status = ? WHERE id = ?";
            const result = await query(sql, [status, id]);
            if (result.affectedRows === 0) {
                throw new Error("Booking tidak ditemukan atau telah di update");
            }
            return { status, id};
        } catch (error) {
            throw new Error("Error saat update status booking: " + error.message);
        }
    },

    cancelBooking: async (id) => {
        try {
            const sql = "UPDATE booking SET status = 'cancelled' WHERE id = ?";
            const result = await query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error("Booking tidak ditemukan");
            } 
            return { id, status: 'cancelled'};
        } catch (error) {
            throw new Error("Error memnbatalkan booking: " + error.message);            
        }
    },

    deleteBooking: async (id) => {
        try {
            const sql = "DELETE FROM booking WHERE id = ?";
            const result = await query(sql, [id]);
            if (result.affectedRows === 0) {
                throw new Error("Booking tidak ditemukan");
            }
            return { id, status: 'deleted'};
        } catch (error) {
            throw new Error("Error menghapus booking: " + error.message);
        }
    },

    checkExistingBooking: async (user_id, pakar_id, date, time) => {
        try {
            const sql = "SELECT id FROM booking WHERE user_id = ? AND pakar_id = ? AND date = ? AND time = ?";
            const result = await query(sql, [user_id, pakar_id, date, time]);
            return result.length > 0;            
        } catch (error) {
            throw new Error("Error mengecek keberadaan booking: " + error.message);
        }
    },
}

export default bookingModel;