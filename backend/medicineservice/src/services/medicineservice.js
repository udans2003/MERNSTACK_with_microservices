import medicineRepository from "../repositories/medicinerepository.js";

class MedicineService {

    async createMedicine(data) {
        return await medicineRepository.create(data);
    }

    async getAllMedicines() {
        return await medicineRepository.findAll();
    }

    async getMedicineById(id) {
        return await medicineRepository.findById(id);
    }

    async getMedicineByCode(medicineCode) {
        return await medicineRepository.findByCode(medicineCode);
    }

    async updateMedicine(id, data) {
        return await medicineRepository.update(id, data);
    }

    async updateMedicineByCode(medicineCode, data) {
        return await medicineRepository.updateByCode(medicineCode, data);
    }

    async deleteMedicine(id) {
        return await medicineRepository.delete(id);
    }

    async deleteMedicineByCode(medicineCode) {
        return await medicineRepository.deleteByCode(medicineCode);
    }

    async restoreMedicineByCode(medicineCode) {
    return await medicineRepository.restoreByCode(medicineCode);
}

}

export default new MedicineService();