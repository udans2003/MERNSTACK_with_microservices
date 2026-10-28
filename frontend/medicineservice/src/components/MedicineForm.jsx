import { useEffect, useState } from "react";

const emptyForm = {
    medicineName: "",
    category: "",
    stock: "",
    manufacturer: "",
    expiryDate: ""
};

function MedicineForm({ medicine, onSave, onCancel }) {
    const [formData, setFormData] = useState(emptyForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData(medicine ? {
            medicineName: medicine.medicineName || "",
            category: medicine.category || "",
            stock: medicine.stock || "",
            manufacturer: medicine.manufacturer || "",
            expiryDate: medicine.expiryDate || ""
        } : emptyForm);
        setErrors({});
    }, [medicine]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.medicineName.trim()) newErrors.medicineName = "Medicine name is required";
        else if (formData.medicineName.trim().length < 3) newErrors.medicineName = "Minimum 3 characters required";
        if (!formData.category) newErrors.category = "Please select a category";
        if (!formData.manufacturer.trim()) newErrors.manufacturer = "Manufacturer is required";
        if (!formData.stock) newErrors.stock = "Stock is required";
        else if (!/^\d+$/.test(formData.stock)) newErrors.stock = "Stock must contain only numbers";
        else if (Number(formData.stock) <= 0) newErrors.stock = "Stock must be greater than 0";
        if (!formData.expiryDate) {
            newErrors.expiryDate = "Expiry date is required";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (new Date(formData.expiryDate) <= today) newErrors.expiryDate = "Expiry date must be in the future";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) onSave(formData);
    };

    const fieldClass = (field) => `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#17233c] outline-none transition placeholder:text-slate-400 focus:border-[#2ec4b6] focus:ring-4 focus:ring-[#2ec4b6]/10 ${errors[field] ? "border-red-400" : "border-slate-200"}`;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="medicineName" className="text-sm font-semibold text-slate-700">Medicine name <span className="text-red-500">*</span></label>
                    <input id="medicineName" type="text" name="medicineName" value={formData.medicineName} onChange={handleChange} className={fieldClass("medicineName")} placeholder="e.g. Paracetamol" />
                    {errors.medicineName && <p className="mt-1.5 text-xs text-red-500">{errors.medicineName}</p>}
                </div>
                <div>
                    <label htmlFor="category" className="text-sm font-semibold text-slate-700">Category <span className="text-red-500">*</span></label>
                    <select id="category" name="category" value={formData.category} onChange={handleChange} className={fieldClass("category")}>
                        <option value="">Select category</option><option>Tablet</option><option>Capsule</option><option>Syrup</option><option>Injection</option>
                    </select>
                    {errors.category && <p className="mt-1.5 text-xs text-red-500">{errors.category}</p>}
                </div>
                <div>
                    <label htmlFor="manufacturer" className="text-sm font-semibold text-slate-700">Manufacturer <span className="text-red-500">*</span></label>
                    <input id="manufacturer" type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} className={fieldClass("manufacturer")} placeholder="e.g. ABC Pharma" />
                    {errors.manufacturer && <p className="mt-1.5 text-xs text-red-500">{errors.manufacturer}</p>}
                </div>
                <div>
                    <label htmlFor="stock" className="text-sm font-semibold text-slate-700">Stock quantity <span className="text-red-500">*</span></label>
                    <input id="stock" type="text" name="stock" value={formData.stock} onChange={handleChange} className={fieldClass("stock")} placeholder="e.g. 100" />
                    {errors.stock && <p className="mt-1.5 text-xs text-red-500">{errors.stock}</p>}
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="expiryDate" className="text-sm font-semibold text-slate-700">Expiry date <span className="text-red-500">*</span></label>
                    <input id="expiryDate" type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className={fieldClass("expiryDate")} />
                    {errors.expiryDate && <p className="mt-1.5 text-xs text-red-500">{errors.expiryDate}</p>}
                </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-xl bg-[#2a9d8f] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2a9d8f]/20 transition hover:bg-[#238b7f]">{medicine ? "Save changes" : "Add medicine"}</button>
            </div>
        </form>
    );
}

export default MedicineForm;
