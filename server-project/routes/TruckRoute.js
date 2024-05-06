const TruckController = require("../controllers/TruckController");
const express = require("express");
const multer = require("multer");
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

//* 1. Create a new truck.
router.post("/", upload.single("avatar"), TruckController.createTruck);

//* 2. Fetches all trucks.
router.get("/", TruckController.getTruck);

//* 3. Fetches a specific truck by its ID.
router.get("/:id", TruckController.getTruckById);

//* 4. Fetches trucks by its brand.
router.get("/:brand", TruckController.getTruckByBrand);

//* 5. Deletes a truck by its ID.
router.delete("/:id", TruckController.deleteTruck);

//* 6. Updates a truck by its ID.
router.patch("/:id", upload.single("avatar"), TruckController.updateTruck);

module.exports = router;
