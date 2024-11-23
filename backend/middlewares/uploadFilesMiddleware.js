import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileDir = path.join(__dirname, "../../backend/public/images/");

if (!fs.existsSync(fileDir)) {
  fs.mkdirSync(fileDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = new Date().getTime().toString();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (_, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only .jpeg, .jpg, or .png files are allowed!"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload.single("image_url");