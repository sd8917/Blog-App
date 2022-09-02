const express = require("express");
const router = express.Router();

const blogController = require("../controllers/blog-controller");

router.get("/", blogController.getAllBlog);
router.get("/:id", blogController.getBlogById);
router.post("/add", blogController.createBlog);
router.put("/update/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/user/:id", blogController.getBlogByUserId);

module.exports = router;
