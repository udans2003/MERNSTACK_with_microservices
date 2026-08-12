import mongoose from 'mongoose'

const medicineSchema = new mongoose.Schema({
    medicineCode: {
        type: String,
        required: true,
        unique: true,
    },
    medicineName: String,
    genericName: String,
    category: String,
    manufacturer: String,
    batchNo: String,
    purchasePrice: Number,
    sellingPrice: Number,
    stock: Number,
    expiryDate: Date,
    status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
},
});

const medicine = mongoose.model("medicine" , medicineSchema)

export default medicine
