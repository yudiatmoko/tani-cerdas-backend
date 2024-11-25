import { query } from "../database/db.js";
import { validationResult } from "express-validator";
import {getAllBooking, addBooking, getBookingById, updateBookingStatus, deleteBooking, checkExistingBooking} from "../models/bookingModel.js";

const handleCreateBooking = async (req, res) => {
    const { pakar_id, date, time } = req.body;
    const user_id = req.user.id;

    try {
        const params = [
            user_id,
            pakar_id,
            date,
            time
        ];
        await addBooking(params)
        res.status(201).json({ message: "Booking berhasil dibuat", data: result });
    } catch (error) {
        res.status(500).json({ message: "Booking gagal dibuat", error: error.message });
    }
};

const handleGetAllBookings = async (req, res) => {
    try {
        const booking = await getAllBooking();
        res.status(200).json({ message: "Booking berhasil ditampilkan", data: booking });
    } catch (error) {
        res.status(500).json({ message: "Booking gagal ditampilkan", error: error.message });
    }
};

const handleGetBookingById = async (req, res) => {
    const { id } = req.params;
    const { id: userId, role } = req.user;

    try {
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan" });
        }

        if (role === 3 && booking.user_id !== userId) {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        res.status(200).json({ message: "Booking berdasarkan id berhasil ditampilkan", data: booking });
    } catch (error) {
        res.status(500).json({ message: "Booking gagal ditampilkan", error: error.message });
    }
};

const handleUpdateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "accepted", "rejected", "cancelled"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Allowed: ${validStatuses.join(", ")}` });
    }

    try {
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan" });
        }

        if (req.user.role === 2 && booking.id_pakar !== req.user.id) {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        const updated = await updateBookingStatus(id, status);
        res.status(200).json({ message: "Status booking berhasil diupdate", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Status booking gagal diupdate", error: error.message });
    }
};

const handleDeleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await getBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan" });
        }

        await deleteBooking(id);
        res.status(200).json({ message: "Berhasil menghapus booking" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus booking", error: error.message });
    }
};

export {
    handleCreateBooking,
    handleGetAllBookings,
    handleGetBookingById,
    handleUpdateBookingStatus,
    handleDeleteBooking,
}