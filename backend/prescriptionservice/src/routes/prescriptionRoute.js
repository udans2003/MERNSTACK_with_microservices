import express from "express";

import {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionByCode,
    updatePrescription,
    deletePrescription
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", createPrescription);

router.get("/", getAllPrescriptions);

router.get("/:prescriptionCode", getPrescriptionByCode);

router.put("/:prescriptionCode", updatePrescription);

router.delete("/:prescriptionCode", deletePrescription);

export default router;