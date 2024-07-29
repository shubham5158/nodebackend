import express from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import validateUser from "../middleware/validateUser.js";

const router = express.Router();

router.post("/register", validateUser, registerUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser)

export default router;
