import bookingModel from "../models/bookingModel.js";

export const handleCreateBooking = async (req, res) => {
    const { pakar_id, date, time } = req.body;
    const user_id = req.user.id;

    try {
        const result = await bookingModel.handleCreateBooking({ user_id, pakar_id, date, time });
        res.status(201).json({ message: "Bookin berhasil dibuat", data: result});
    } catch (error) {
        res.status(500).json({ message: "Booking gagal dibuat", error: error.message });
    }
};

export const handleGetAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.handleGetAllBookings();
        res.status(200).json({ message: "Booking berhasil ditampilkan", data: bookings});
    } catch (error) {
        res.status(500).json({ message: "Booking gagal ditampilkan", error: error,message });
    }
}

export const handleGetBookingById = async (req, res) => {
    const {id} = req.params;
    const {id: userId, role} = req.user;

    try {
        const booking = await bookingModel.handleGetBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan"});
        }
        
        if (role === 3 && booking.user_id !== userId){
            return res.status(403).json({ message: "Akses ditolak" });
        }

        res.status(200).json({ message: "Booking berhasil ditampilkan", data: booking });
    } catch (error) {
        res.status(500).json({ message: "Booking gagal ditampilkan", error: error.message });
    }
};

export const handleUpdateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "accepted", "rejected", "cancelled"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Allowed: ${validStatuses.join(", ")}` });
    }

    try {
        const booking = await bookingModel.handleGetBookingById(id);
        if (!booking) {
            return res.status(404).json ({ message: "Booking tidak ditemukan" });
        }

        if (req.user.role === 2 && booking.id_pakar !== req.user.id) {
            return res.status(403).json({ message: "Akses ditolak" });
        }

        const updated = await bookingModel.handleUpdateBookingStatus(id, status);
        res.status(500).json({ message : "Status booking berhasil diupdate", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Status booking gagal diupdate", error: error.message });
    }
};

export const handleDeleteBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await bookingModel.handleGetBookingById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking tidak ditemukan" });
        }

        await bookingModel.handleDeleteBooking(id);
        res.status(200).json({ message: "Berhasil menghapus booking" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus booking", error: error.message });
    }
};