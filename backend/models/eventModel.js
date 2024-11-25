import { query } from "../database/db.js";

const getAllEvents = async () => {
  try {
    const eventsData = await query(
      `SELECT id, title, date, time, location, image 
       FROM events`
    );

    if (eventsData.length === 0) {
      throw new Error("No events found");
    }

    const formattedEvents = eventsData.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
    }));

    return formattedEvents;
  } catch (error) {
    throw error;
  }
};

const getEventById = async (eventId) => {
  try {
    const eventData = await query(
      `SELECT id, title, date, time, location, image 
       FROM events 
       WHERE id = ?`,
      [eventId]
    );

    if (eventData.length === 0) {
      throw new Error("Event not found");
    }

    const event = eventData[0];

    return {
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
    };
  } catch (error) {
    throw error;
  }
};

const addEvent = async ({ title, date, time, location, image }) => {
  try {
    const result = await query(
      `INSERT INTO events (title, date, time, location, image) 
       VALUES (?, ?, ?, ?, ?)`,
      [title, date, time, location, image]
    );

    return {
      id: result.insertId,
      title,
      date,
      time,
      location,
      image,
    };
  } catch (error) {
    throw error;
  }
};

const deleteEventById = async (eventId) => {
  try {
    const result = await query(`DELETE FROM events WHERE id = ?`, [eventId]);

    // Jika tidak ada baris yang terpengaruh, ID tidak ditemukan
    if (result.affectedRows === 0) {
      return false;
    }

    return true;
  } catch (error) {
    throw error;
  }
};

const updateEventById = async (eventId, { title, date, time, location, image }) => {
  try {
    const result = await query(
      `UPDATE events 
       SET title = ?, date = ?, time = ?, location = ?, image = ?
       WHERE id = ?`,
      [title, date, time, location, image, eventId]
    );

    // Jika tidak ada baris yang diperbarui, ID tidak ditemukan
    if (result.affectedRows === 0) {
      return false;
    }

    return {
      id: eventId,
      title,
      date,
      time,
      location,
      image,
    };
  } catch (error) {
    throw error;
  }
};

// Tambahkan updateEventById ke daftar ekspor
export { getAllEvents, getEventById, addEvent, deleteEventById, updateEventById };

