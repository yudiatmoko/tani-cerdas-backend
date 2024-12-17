import { query } from "../database/db.js";
import { validationResult } from "express-validator";
import { getAllEvents, addEvent, getEventById, updateEventById, deleteEventById, checkExistingEvent } from "../models/eventModel.js";

// Fungsi untuk membuat event
const handleCreateEvent = async (req, res) => {
    const { title, date, time, location, image } = req.body;
  
    // Validasi input
    if (!title || !date || !time || !location || !image) {
        return res.status(400).json({ status: false, message: "Semua field harus diisi." });
    }
  
    try {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        // Menambahkan event
        const insertId = await addEvent([title, formattedDate, time, location, image]);
        return res.status(201).json({
            status: true,
            message: "Event berhasil dibuat.",
            eventId: insertId, // Mengembalikan ID event yang baru
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message,
        });
    }
};

const handleGetAllEvents = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json({ message: "Event berhasil ditampilkan", data: events });
    } catch (error) {
        res.status(500).json({ message: "Event gagal ditampilkan", error: error.message });
    }
};

const handleGetEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

        res.status(200).json({ message: "Event berdasarkan id berhasil ditampilkan", data: event });
    } catch (error) {
        res.status(500).json({ message: "Event gagal ditampilkan", error: error.message });
    }
};

const handleUpdateEventById = async (req, res) => {
    const { id } = req.params;
    const { title, date, time, location, image } = req.body;

    if (!title || !date || !time || !location || !image) {
        return res.status(400).json({ message: "Semua field harus diisi." });
    }

    try {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const updated = await updateEventById(id, [title, formattedDate, time, location, image]);
        res.status(200).json({ message: "Event berhasil diupdate", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Event gagal diupdate", error: error.message });
    }
};

const handleDeleteEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await getEventById(id);
        if (!event) {
            return res.status(404).json({ message: "Event tidak ditemukan" });
        }

<<<<<<< HEAD
        await deleteEventById(id);
        res.status(200).json({ message: "Berhasil menghapus event" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus event", error: error.message });
=======
  try {
    const newEvent = await addEvent({ title, description, date, location });
    res.status(201).json({ message: "Event added successfully", data: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Menghapus event berdasarkan ID
export const handleDeleteEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const result = await deleteEventById(eventId);

    if (!result) {
      return res.status(404).json({ message: "Event not found" });
>>>>>>> a4730f12b9a8164d0a2fb7867ba40dda84c53374
    }
};

export {
    handleCreateEvent,
    handleGetAllEvents,
    handleGetEventById,
    handleUpdateEventById,
    handleDeleteEventById
};
