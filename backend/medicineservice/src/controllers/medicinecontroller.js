import medicineService from "../services/medicineservice.js";
import {
    medicineCreateSchema,
    medicineUpdateSchema
} from "../validations/medicineValidation.js";



export async function createMedicine(req, res) {

    try {

        const validatedData = medicineCreateSchema.parse({

            ...req.body,

            stock: Number(req.body.stock)

        });

        const medicine = await medicineService.createMedicine(validatedData);

        res.status(201).json(medicine);

    } catch (error) {

        if (error.name === "ZodError") {

            return res.status(400).json({

                errors: error.issues

            });

        }

        if (error.code === 11000) {

            return res.status(409).json({

                message: "Medicine code already exists"

            });

        }

        res.status(500).json({

            message: error.message

        });

    }

}
// const createMedicine = async (req, res) => {

//     const medicine = await medicineService.createMedicine(req.body);

//     res.status(201).json(medicine);

// };

const getMedicines = async (req, res) => {

    const medicines = await medicineService.getAllMedicines();

    res.json(medicines);

};

const getMedicine = async (req, res) => {

    const medicine = await medicineService.getMedicineById(req.params.id);

    res.json(medicine);

};

export const updateMedicine = async (req, res) => {

    try {

        // Validate request body
        const validatedData = medicineUpdateSchema.parse({

            ...req.body,

            stock: Number(req.body.stock)

        });

        // Update using validated data
        const updatedMedicine = await medicineService.updateMedicine(
            req.params.medicineCode,
            validatedData
        );

        res.json(updatedMedicine);

    } catch (error) {

        if (error.name === "ZodError") {

            return res.status(400).json({
                errors: error.issues
            });

        }

        res.status(500).json({
            message: error.message
        });

    }

};

const deleteMedicine = async (req, res) => {

    await medicineService.deleteMedicineByCode(req.params.medicineCode);

    res.json({
        message: "Medicine deleted successfully",
    });

};

const restoreMedicine = async (req, res) => {

    const medicine = await medicineService.restoreMedicineByCode(
        req.params.medicineCode
    );

    res.json(medicine);

};

export default {
    createMedicine,
    getMedicines,
    getMedicine,
    updateMedicine,
    deleteMedicine,
    restoreMedicine,
};