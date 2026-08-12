import mongoose from "mongoose";

const prescriptionMedicineSchema = new mongoose.Schema(
    {
        medicineCode: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        _id: false
    }
);

const prescriptionSchema = new mongoose.Schema(
    {
        prescriptionCode: {
            type: String,
            required: true,
            unique: true
        },

        patientId: {
            type: String,
            required: true
        },

        doctorId: {
            type: String,
            required: true
        },

        medicines: {
            type: [prescriptionMedicineSchema],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length > 0;
                },
                message: "At least one medicine is required"
            }
        },

        prescriptionDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: ["Pending", "Completed", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

const Prescription = mongoose.model(
    "Prescription",
    prescriptionSchema
);

export default Prescription;