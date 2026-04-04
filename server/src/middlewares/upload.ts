import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "categories",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as any,
});

const upload = multer({ storage });

export default upload;