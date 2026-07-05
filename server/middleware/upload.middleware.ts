import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  const allowed = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "application/pdf",
    "application/zip",
  ];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

export default multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
  fileFilter,
});