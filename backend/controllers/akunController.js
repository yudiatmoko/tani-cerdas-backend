import {
    getAllAkun,
    getAkunByName,
    getAkunById,
    updateAkunFields,
    deleteAkun,
    getAkunByRole
} from "../models/akunModel.js";

// Handler untuk mendapatkan semua akun
const handleGetAllAkun = async (req, res) => {
    try {
        const result = await getAllAkun();
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
};

// Handler untuk mendapatkan akun berdasarkan ID
const handleGetAkunById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "ID akun harus diberikan" });
        }

        const result = await getAkunById(id);
        if (!result) {
            return res.status(404).json({ error: "Data akun tidak ditemukan" });
        }

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
};

// Handler untuk mendapatkan akun berdasarkan nama
const handleGetAkunByName = async (req, res) => {
    const { name } = req.params.role_id; // ambil parameter nama dari URL

    try {
        const result = await getAkunByName(name); // panggil fungsi untuk mendapatkan akun berdasarkan nama
        if (!result) {
            return res.status(404).json({ message: `Akun dengan nama "${name}" tidak ditemukan` });
        }

        res.status(200).json({
            message: "Berhasil mendapatkan akun berdasarkan nama",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal mendapatkan akun berdasarkan nama",
            error: error.message,
        });
    }
};


// Handler untuk memperbarui field akun
const handleUpdateAkunFields = async (req, res) => {
    try {
        const { id } = req.params;
        const { city, job, image_url, experience } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID akun harus diberikan" });
        }

        const fieldsToUpdate = {};
        if (city !== undefined) fieldsToUpdate.city = city;
        if (job !== undefined) fieldsToUpdate.job = job;
        if (image_url !== undefined) fieldsToUpdate.image_url = image_url;
        if (experience !== undefined) fieldsToUpdate.experience = experience;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({ error: "Tidak ada field yang diberikan untuk diperbarui" });
        }

        const result = await updateAkunFields(id, fieldsToUpdate);
        if (!result) {
            return res.status(404).json({ error: "Data akun tidak ditemukan" });
        }

        res.status(200).json({
            message: "Data berhasil diperbarui",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            error: "Terjadi kesalahan saat memperbarui data akun",
            details: error.message,
        });
    }
};

const handleDeleteAkun = async (req, res) => {
    const {id} = req.params;

    try {
        const akun = await getAkunById(id);
        if (!akun) {
            return res.status(404).json({ message: "Akun tidak ditemukan" });
        }
        await deleteAkun(id);
        res.status(200).json({ message: "Berhasil menghapus akun" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus akun", error: error.message });
    }
}

const handleGetAkunByRole = async (req, res) => {
    const {role_id} = req.params;

    try {
        const result = await getAkunByRole(role_id)

        if (!result || result.length === 0) {
            return res.status(404).json({
                message: "Data akun tidak ditemukan untuk role tersebut",
            });
        }
        res.status(200).json({
            message: "Berhasil mendapatkan data akun berdasarkan role",
            data: result,
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal mendapatkan akun berdasarkan role", error: error.message });
    }
}
// Ekspor fungsi handler
export {
    handleGetAkunById,
    handleGetAllAkun,
    handleGetAkunByName,
    handleUpdateAkunFields,
    handleDeleteAkun,
    handleGetAkunByRole
};
