import akunModel from "../models/akunModel.js";

const akunController = {
    handleGetAllAkun: async (req, res) => {
        try {
            const result = await akunModel.getAllAkun();
            res.status(200).json({
                message: "Berhasil mendapatkan semua akun",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                error: "Terjadi kesalahan saat mengambil data akun",
                details: error.message,
            });
        }
    },

    getAkunById: async (req, res) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "ID akun harus diberikan" });
            }

            const result = await akunModel.getAkunById(id);
            res.status(200).json({
                message: "Berhasil mendapatkan data akun",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                error: "Terjadi kesalahan saat mengambil data akun berdasarkan ID",
                details: error.message,
            });
        }
    },

    getAkunByName: async (req, res) => {
        try {
            const { name } = req.query;

            if (!name) {
                return res.status(400).json({ error: "Nama harus diberikan" });
            }

            const result = await akunModel.getAkunByName(name);
            res.status(200).json({
                message: "Berhasil mendapatkan data akun berdasarkan nama",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                error: "Terjadi kesalahan saat mengambil data akun berdasarkan nama",
                details: error.message,
            });
        }
    },

    
    updateAkunFields: async (req, res) => {
        try {
            const { id } = req.params;
            const { city, job, image_url, experience } = req.body;

            if (!id) {
                return res.status(400).json({ error: "ID akun harus diberikan" });
            }

            const fieldsToUpdate = { city, job, image_url, experience };

            const result = await akunModel.updateAkunFields(id, fieldsToUpdate);
            res.status(200).json({
                message: "Data berhasil diperbarui.",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                error: "Terjadi kesalahan saat memperbarui data akun",
                details: error.message,
            });
        }
    },
};

export default akunController;