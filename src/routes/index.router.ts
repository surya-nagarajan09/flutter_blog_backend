const { Router } = require("express");
const router = Router();

import {
  getAllPost,
  join,
  login,
  forgetPassword,
  otpVerification,
  jobDetails,
  companyDetails,
  createBlog,
  getAllBlog,
  getBlogById,
  updateLike,
  uploadImage,
  getImage,
  deletePost,
  getAvatar
} from "../controllers/index.controller";
import auth from "../auth/auth";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


router.get("/get-all-jobs", getAllPost);
router.post("/join", join);
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/verify-otp", otpVerification);
router.post("/job-details", jobDetails);
router.post("/company-details", companyDetails);
router.post("/create-blog", createBlog);
router.get("/get-all-blog", getAllBlog);
router.post("/get-blog", getBlogById);
router.post("/update-like", updateLike);
router.post("/upload-image", upload.single("image"),uploadImage);
router.get("/images/:key",getImage);
router.post("/delete-post",deletePost);
router.post('/get-avatar', getAvatar)


export default router;
