import express from "express";
import medicineController from "../controllers/medicinecontroller.js";

const router = express.Router();

router.post("/", medicineController.createMedicine);

router.get("/", medicineController.getMedicines);

router.get("/:medicineCode", medicineController.getMedicine);

router.put("/:medicineCode", medicineController.updateMedicine);

router.put("/:medicineCode/restore", medicineController.restoreMedicine);

router.delete("/:medicineCode", medicineController.deleteMedicine);

export default router;