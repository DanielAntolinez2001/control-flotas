import * as userController from "../controllers/UserController.js";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//* 0. Create a harcoded user.
router.post("/root", upload.single("avatar"), userController.createHardcodedUser);

//* 1. Create a new user.
router.post("/", upload.single("avatar"), userController.createUser);

//* 2. Fetches all users.
router.get("/", userController.getUser);

//* 3. Fetches a specific user by its ID.
router.get("/:id", userController.getUSerById);

//* 4. Fetches users by its name.
router.get("/:name", userController.getUSerByName);

//* 5. Deletes a user by its ID.
router.delete("/:id", userController.deleteUser);

//* 6. Deletes a user by its ID.
router.patch("/:id", upload.single("avatar"), userController.updateUser);

// 7. Ruta para loguear un usuario 
router.post('/login', userController.login);

export default router

