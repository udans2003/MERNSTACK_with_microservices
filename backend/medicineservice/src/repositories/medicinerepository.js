import Medicine from "../models/medicinemodel.js";

class MedicineRepository {

    async create(data) {
        return await Medicine.create(data);
    }

    async findAll() {
        return await Medicine.find();
    }

    async findById(id) {
        return await Medicine.findById(id);
    }

    async findByCode(medicineCode) {
        return await Medicine.findOne({ medicineCode });
    }

    async update(id, data) {
        return await Medicine.findByIdAndUpdate(id, data, {
            new: true,
        });
    }

    async updateByCode(medicineCode, data) {
        return await Medicine.findOneAndUpdate({ medicineCode }, data, {
            new: true,
        });
    }

    async decrementStockByCode(medicineCode, quantity) {
        return await Medicine.findOneAndUpdate(
            {
                medicineCode,
                stock: { $gte: quantity }
            },
            {
                $inc: { stock: -quantity }
            },
            {
                new: true
            }
        );
    }

    async delete(id) {
        return await Medicine.findByIdAndDelete(id);
    }

    async deleteByCode(medicineCode) {
    return await Medicine.findOneAndUpdate(
        { medicineCode },
        { status: "Inactive" },
        { new: true }
    );
}

    async restoreByCode(medicineCode) {
    return await Medicine.findOneAndUpdate(
        { medicineCode },
        { status: "Active" },
        { new: true }
    );
}

}

export default new MedicineRepository();