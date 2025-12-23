import multer from "multer";

// Memory storage for file uploads
const storage = multer.memoryStorage();

// Create multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

// Export single file upload middleware
export const uploadImage = upload.single("userImage");

// Error handling middleware
export const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "File upload failed",
    });
  }
  next();
};
