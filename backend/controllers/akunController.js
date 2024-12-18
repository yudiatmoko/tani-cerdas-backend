import { query } from "../database/db.js";
import {
    getAllAkun,
    getAkunByName,
    getAkunById,
    updateAkun,
    deleteAkun,
    getAkunByRole,
    getExistingImageUrl
} from "../models/akunModel.js";
import { validationResult } from "express-validator";
import { deleteFile, deleteImageByFilename } from "../utils/file.js";

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

const handleGetAkunImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validasi ID
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID akun harus diberikan dan berupa angka" });
      }
  
      // Ambil data gambar
      const image_url = await getExistingImageUrl(id);
  
      // Periksa apakah data ditemukan
      if (!image_url) {
        return res.status(404).json({ error: "Data akun tidak ditemukan" });
      }
  
      // Kirim respons sukses
      res.status(200).json({
        message: "Berhasil mendapatkan data gambar akun",
        data: { id, image_url },
      });
    } catch (error) {
      res.status(500).json({
        error: "Terjadi kesalahan saat mengambil data gambar akun berdasarkan ID",
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
const handleUpdateAkun = async (req, res) => {
    const id = req.params.id;
    console.log("ID yang diterima:", id);
    const { name, city, job, institute, experiences } = req.body;
    const image_url = req.file;
  
    try {
      // Validasi input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        if (image_url) deleteFile(image_url.path);
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Periksa apakah ID valid dan data akun ada
      const existingImageUrl = await getAkunById(id);
      console.log("Hasil dari getAkunById:", existingImageUrl);
  
      // Cek apakah image_url ada dan bukan null
      
  
      // Update akun
      const params = [
        name,
        city,
        job,
        institute,
        experiences,
        image_url ? image_url.filename : null,
        id,
      ];
      await updateAkun(params);
  
      // Respons sukses
      return res.status(200).json({
        status: true,
        message: "Akun updated successfully",
        data: {
          ...req.body,
          image_url: image_url ? image_url.filename : (null),
        },
      });
    } catch (error) {
      if (image_url) deleteFile(image_url.path);
      console.error(error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
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
    handleUpdateAkun,
    handleDeleteAkun,
    handleGetAkunByRole,
    handleGetAkunImage
};
