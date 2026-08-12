import Prescription from "../models/prescriptionModel.js";

export const createPrescription = async (data) => {
    return await Prescription.create(data);
};

export const getAllPrescriptions = async () => {
    return await Prescription.find();
};

export const getPrescriptionByCode = async (prescriptionCode) => {
    return await Prescription.findOne({ prescriptionCode });
};

export const updatePrescription = async (
    prescriptionCode,
    data
) => {
    return await Prescription.findOneAndUpdate(
        { prescriptionCode },
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

export const deletePrescription = async (prescriptionCode) => {
    return await Prescription.findOneAndDelete({
        prescriptionCode
    });
};