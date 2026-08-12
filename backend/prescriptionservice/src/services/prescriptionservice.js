import * as prescriptionRepository
    from "../repositories/prescriptionRepository.js";
import { publishMedicineEvent }
    from "../rabbitmq/producer.js";

export const createPrescription = async (data) => {

    const existingPrescription =
        await prescriptionRepository.getPrescriptionByCode(
            data.prescriptionCode
        );

    if (existingPrescription) {
        throw new Error(
            "Prescription code already exists"
        );
    }

    const prescription =
        await prescriptionRepository.createPrescription(data);

    for (const medicine of prescription.medicines) {

        await publishMedicineEvent({

            event: "MEDICINE_PRESCRIBED",

            prescriptionCode:
                prescription.prescriptionCode,

            medicineCode:
                medicine.medicineCode,

            quantity:
                medicine.quantity
        });
    }

    return prescription;
};

export const getAllPrescriptions = async () => {
    return await prescriptionRepository.getAllPrescriptions();
};

export const getPrescriptionByCode = async (prescriptionCode) => {

    const prescription =
        await prescriptionRepository.getPrescriptionByCode(
            prescriptionCode
        );

    if (!prescription) {
        throw new Error("Prescription not found");
    }

    return prescription;
};

export const updatePrescription = async (
    prescriptionCode,
    data
) => {

    const prescription =
        await prescriptionRepository.updatePrescription(
            prescriptionCode,
            data
        );

    if (!prescription) {
        throw new Error("Prescription not found");
    }

    return prescription;
};

export const deletePrescription = async (prescriptionCode) => {

    const prescription =
        await prescriptionRepository.deletePrescription(
            prescriptionCode
        );

    if (!prescription) {
        throw new Error("Prescription not found");
    }

    return prescription;
};