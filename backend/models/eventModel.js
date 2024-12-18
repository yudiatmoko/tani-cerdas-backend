import { query } from "../database/db.js";

// Function to add a new event
const addEvent = async (params) => {
    const sql = 
        `INSERT INTO events (title, date, time, location, image, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, NOW(), NOW())`;
    return query(sql, params);
};

// Function to get all events
const getAllEvents = async () => {
    try {
        const sql = `SELECT 
                        id, 
                        title, 
                        date, 
                        time, 
                        location, 
                        image
                     FROM events`;
        const rows = await query(sql);  // Directly execute the query and return results
        return rows;
    } catch (error) {
        throw new Error("Fetching events error: " + error.message);
    }
};

// Function to get a specific event by its ID
const getEventById = async (id) => {
    try {
        const sql =
            `SELECT 
                id, 
                title, 
                date, 
                time, 
                location, 
                image
            FROM events
            WHERE id = ?`;
        const rows = await query(sql, [id]);

        if (rows.length === 0) {
            throw new Error("Event tidak ditemukan");
        }

        return rows[0];
    } catch (error) {
        throw new Error("Error menampilkan event dengan ID: " + error.message);
    }
};

// Function to update an event by its ID
const updateEventById = async (id, params) => {
    try {
        const sql = `UPDATE events 
                     SET title = ?, date = ?, time = ?, location = ?, image = ?, updated_at = NOW() 
                     WHERE id = ?`;
        const result = await query(sql, [...params, id]);

        if (result.affectedRows === 0) {
            throw new Error("Event tidak ditemukan atau telah diupdate");
        }

        return { id, ...params };
    } catch (error) {
        throw new Error("Error saat update event: " + error.message);
    }
};

// Function to delete an event by its ID
const deleteEventById = async (id) => {
    try {
        const sql = "DELETE FROM events WHERE id = ?";
        const result = await query(sql, [id]);

        if (result.affectedRows === 0) {
            throw new Error("Event tidak ditemukan");
        }

        return { id, status: 'deleted' };
    } catch (error) {
        throw new Error("Error menghapus event: " + error.message);
    }
};

// Function to check if an event with the same title, date, and time already exists
const checkExistingEvent = async (title, date, time) => {
    try {
        const sql = "SELECT id FROM events WHERE title = ? AND date = ? AND time = ?";
        const result = await query(sql, [title, date, time]);
        return result.length > 0;  // If an event already exists, return true
    } catch (error) {
        throw new Error("Error mengecek keberadaan event: " + error.message);
    }
};

export { 
    addEvent, 
    getAllEvents, 
    getEventById, 
    updateEventById, 
    deleteEventById, 
    checkExistingEvent 
};
