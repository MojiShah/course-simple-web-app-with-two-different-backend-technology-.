import express from "express"
import { createCourse, deleteCourse, getCourseDetail, getcourses, updateCourse } from "../controllers/courseController.js";
import upload from "../middlewares/upload.js";

const router:express.Router  = express.Router();

router.get("/",getcourses);
router.get("/:id",getCourseDetail);
router.post("/",upload.single("image"),createCourse);
router.patch("/:id",upload.single("image"),updateCourse);
router.delete("/:id",deleteCourse);



export default router