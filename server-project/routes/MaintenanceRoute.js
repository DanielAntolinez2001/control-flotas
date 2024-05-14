import * as  MaintenanceController from "../controllers/MaintenanceController.js";
import express from "express";
const router = express.Router();

//* 1. Create a new truck.
router.post("/", MaintenanceController.createMaintenance);

//* 2. Fetches all trucks.
router.get("/", MaintenanceController.getMaintenances);

//* 3. Fetches a specific truck by its ID.
router.get("/:id", MaintenanceController.getMaintenanceByTruck);

//* 4. Fetches trucks by its brand.
router.get("/:brand", MaintenanceController.getTruckByBrand);

//* 5. Deletes a truck by its ID.
router.delete("/:id", MaintenanceController.deleteTruck);

//* 6. Updates a truck by its ID.
router.patch("/:id", MaintenanceController.updateTruck);

export default router
