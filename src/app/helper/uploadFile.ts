import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

// Configure DigitalOcean Spaces
const s3 = new S3Client({
  endpoint: `https://${process.env.DO_SPACE_ENDPOINT}`,
  region: process.env.DO_SPACE_REGION, // Replace with your region
  credentials: {
    accessKeyId: process.env.DO_SPACE_ACCESS_KEY || "", // Store in .env for security
    secretAccessKey: process.env.DO_SPACE_SECRET_KEY || "", // Store in .env for security
  },
});

// Create multer storage for DigitalOcean Spaces
const s3Storage = multerS3({
  s3: s3,
  bucket: process.env.DO_SPACE_BUCKET || "", // Replace with your bucket name
  // acl: "public-read", // Ensure files are publicly accessible
  contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically detect content type
  key: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // File name in Spaces
  },
});

// Updated filter to allow all file types
const allFilesFilter = (req: any, file: any, cb: any) => {
  // Allow all file types
  cb(null, true);
};

// Image filter (for specific image uploads)
const imageFilter = (req: any, file: any, cb: any) => {
  const allowedMimes = ["image/png", "image/jpeg", "image/jpg"];
  
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(
      new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed."),
      false
    );
  }
  cb(null, true);
};

// Upload configurations
const upload = multer({
  storage: s3Storage,
  fileFilter: imageFilter, // Apply image filter
});

// Upload for all file types
const uploadAllFiles = multer({
  storage: s3Storage,
  fileFilter: allFilesFilter, // Allow all file types
});

export const getImageUrl = async (file: Express.MulterS3.File) => {
  let image = file?.location;
  if (!image || !image.startsWith("http")) {
    image = `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}/${file?.key}`;
  }
  return image;
};

export const getImageUrls = async (files: Express.MulterS3.File[]) => {
  return files.map((file) => {
    let image = file?.location;
    if (!image || !image.startsWith("http")) {
      image = `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}/${file?.key}`;
    }
    return image;
  });
};

// Helper function to get file URLs (for documents and other files)
export const getFileUrl = async (file: Express.MulterS3.File) => {
  let fileUrl = file?.location;
  if (!fileUrl || !fileUrl.startsWith("http")) {
    fileUrl = `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}/${file?.key}`;
  }
  return fileUrl;
};

export const getFileUrls = async (files: Express.MulterS3.File[]) => {
  return files.map((file) => {
    let fileUrl = file?.location;
    if (!fileUrl || !fileUrl.startsWith("http")) {
      fileUrl = `https://${process.env.DO_SPACE_BUCKET}.${process.env.DO_SPACE_ENDPOINT}/${file?.key}`;
    }
    return fileUrl;
  });
};

// Single image uploads (with image filter)
const uploadProfileImage = upload.single("image");
const uploadFoodImages = upload.single("foodImage");
const serviceImage = upload.single("serviceImage");

// Multiple image uploads (with image filter)
const uploadMultipleImages = upload.array("images", 30);

// Single file uploads (all file types)
const uploadSingleFile = uploadAllFiles.single("file");
const uploadLogo = uploadAllFiles.single("logo");

// Multiple file uploads (all file types)
const uploadMultipleFiles = uploadAllFiles.array("documents", 10);

// Mixed uploads for residences (logo + documents)
const uploadResidenceFiles = uploadAllFiles.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'documents', maxCount: 10 }
]);

export const fileUploader = {
  upload,
  uploadAllFiles,
  uploadProfileImage,
  uploadFoodImages,
  serviceImage,
  uploadMultipleImages,
  uploadSingleFile,
  uploadLogo,
  uploadMultipleFiles,
  uploadResidenceFiles,
};