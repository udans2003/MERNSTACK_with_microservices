import * as prescriptionService
    from "../services/prescriptionService.js";

export const createPrescription = async (req, res) => {
    try {

        const prescription = await prescriptionService.createPrescription(
            req.body
        );

        res.status(201).json({
            message: "Prescription created successfully",
            prescription: prescription
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};


export const getAllPrescriptions = async (req, res) => {
    try {

        const prescriptions =
            await prescriptionService.getAllPrescriptions();

        res.status(200).json({
            success: true,
            data: prescriptions
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const getPrescriptionByCode = async (req, res) => {
    try {

        const prescription =
            await prescriptionService.getPrescriptionByCode(
                req.params.prescriptionCode
            );

        res.status(200).json({
            success: true,
            data: prescription
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};


export const updatePrescription = async (req, res) => {
    try {

        const prescription =
            await prescriptionService.updatePrescription(
                req.params.prescriptionCode,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Prescription updated successfully",
            data: prescription
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


export const deletePrescription = async (req, res) => {
    try {

        await prescriptionService.deletePrescription(
            req.params.prescriptionCode
        );

        res.status(200).json({
            success: true,
            message: "Prescription deleted successfully"
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};