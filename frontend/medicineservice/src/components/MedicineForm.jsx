import { useEffect, useState } from "react";

function MedicineForm({ medicine,

    onSave,

    onCancel,

    submitError }) {

    const [formData, setFormData] = useState({

        medicineCode: "",

        medicineName: "",

        category: "",

        stock: "",

        manufacturer: "",

        // quantity: "",

        expiryDate: ""

    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

    if (medicine) {

        setFormData({

            medicineCode: medicine.medicineCode || "",

            medicineName: medicine.medicineName || "",

            category: medicine.category || "",

            stock: medicine.stock || "",

            manufacturer: medicine.manufacturer || "",

            expiryDate: medicine.expiryDate || ""

        });

    } else {

        setFormData({

            medicineCode: "",

            medicineName: "",
            category: "",
            stock: "",
            manufacturer: "",
            // quantity: "",
            expiryDate: ""

        });

    }

}, [medicine]);

    const handleChange = (e) => {

    const { name, value } = e.target;

    // Stock validation while typing
    if (name === "stock") {

        if (value !== "" && !/^\d+$/.test(value)) {

            setErrors({
                ...errors,
                stock: "Stock must contain only numbers"
            });

        } else {

            setErrors({
                ...errors,
                stock: ""
            });

        }
    } else {

        setErrors({
            ...errors,
            [name]: ""
        });

    }

    setFormData({
        ...formData,
        [name]: value
    });

};

    const validateForm = () => {

    const newErrors = {};

    if (!formData.medicineName.trim()) {
        newErrors.medicineName = "Medicine name is required";
    } else if (formData.medicineName.trim().length < 3) {
        newErrors.medicineName = "Minimum 3 characters required";
    }

    if (!formData.medicineCode.trim()) {
        newErrors.medicineCode = "Medicine code is required";
    }

    if (!formData.category) {
        newErrors.category = "Please select a category";
    }

    if (!formData.manufacturer.trim()) {
        newErrors.manufacturer = "Manufacturer is required";
    }

    if (!formData.stock) {

    newErrors.stock = "Stock is required";

} else if (!/^\d+$/.test(formData.stock)) {

    newErrors.stock = "Stock must contain only numbers";

} else if (Number(formData.stock) <= 0) {

    newErrors.stock = "Stock must be greater than 0";

}

    if (!formData.expiryDate) {
        newErrors.expiryDate = "Expiry date is required";
    } else {

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const expiry = new Date(formData.expiryDate);

        if (expiry <= today) {
            newErrors.expiryDate =
                "Expiry date must be in the future";
        }

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};

    const handleSubmit = (e) => {

    e.preventDefault();

    console.log("Save clicked");

    const valid = validateForm();

    console.log("Validation:", valid);
    console.log("Errors:", errors);
    console.log("Data:", formData);

    if(valid){
        onSave(formData);
    }

};
    

    return (

    <form
    onSubmit={handleSubmit}
    className="space-y-4"
>

    {submitError && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
        </div>
    )}

    <div className="space-y-1">
    <label
        htmlFor="medicineCode"
        className="block text-sm font-medium text-gray-700"
    >
        Medicine Code
        <span className="text-red-500">*</span>
    </label>

    <input
    id="medicineCode"
    type="text"
    name="medicineCode"
    value={formData.medicineCode}
    onChange={handleChange}
    disabled={Boolean(medicine)}
    className={`w-full rounded-lg px-4 py-2.5 border ${
        errors.medicineCode
            ? "border-red-500"
            : formData.medicineCode
            ? "border-green-500"
            : "border-gray-300"
    } focus:ring-2 focus:ring-blue-200 ${medicine ? "bg-gray-100" : ""}`}
    placeholder="Enter medicine code"
/> 

{errors.medicineCode && (
    <p className="text-red-500 text-sm mt-1">
        {errors.medicineCode}
    </p>
)}
</div>

    <div className="space-y-1">
    <label
        htmlFor="medicineName"
        className="block text-sm font-medium text-gray-700"
    >
        Medicine Name
        <span className="text-red-500">*</span>
    </label>

    <input
    id="medicineName"
    type="text"
    name="medicineName"
    value={formData.medicineName}
    onChange={handleChange}
    className={`w-full rounded-lg px-4 py-2.5 border ${
        errors.medicineName
            ? "border-red-500"
            : formData.medicineName
            ? "border-green-500"
            : "border-gray-300"
    } focus:ring-2 focus:ring-blue-200`}
    placeholder="Enter medicine name"
/>

{errors.medicineName && (
    <p className="text-red-500 text-sm mt-1">
        {errors.medicineName}
    </p>
)}
</div>

    <div className="space-y-1">
    <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700"
    >
        Category
        <span className="text-red-500">*</span>
    </label>

    <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        required
    >
        <option value="">Select Category</option>
        <option>Tablet</option>
        <option>Capsule</option>
        <option>Syrup</option>
        <option>Injection</option>
    </select>
</div>

    <div className="space-y-1">
    <label
        htmlFor="medicineName"
        className="block text-sm font-medium text-gray-700"
    >
        Manufacturer
        <span className="text-red-500">*</span>
    </label>
    </div>
            <input
                type="text"
                name="manufacturer"
                placeholder="Enter manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
            {errors.manufacturer && (
    <p className="text-red-500 text-sm mt-1">
        {errors.manufacturer}
    </p>
)}
    <div className="space-y-1">
    <label
        htmlFor="medicineName"
        className="block text-sm font-medium text-gray-700"
    >
        Stock
        <span className="text-red-500">*</span>
    </label>
    </div>
            <input
    type="text"
    name="stock"
    placeholder="Enter stock"
    value={formData.stock}
    onChange={handleChange}
    className={`w-full rounded-lg px-4 py-2.5 border ${
        errors.stock
            ? "border-red-500"
            : formData.stock
            ? "border-green-500"
            : "border-gray-300"
    } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none`}
/>

{errors.stock && (
    <p className="text-red-500 text-sm mt-1">
        {errors.stock}
    </p>
)}    

    <div className="space-y-1">
    <label
        htmlFor="medicineName"
        className="block text-sm font-medium text-gray-700"
    >
        Expiary Date
        <span className="text-red-500">*</span>
    </label>
    </div>

            <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
            />
            {errors.expiryDate && (
    <p className="text-red-500 text-sm mt-1">
        {errors.expiryDate}
    </p>
)}

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">

                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Save
                </button>

            </div>

        </form>

    );

    };

export default MedicineForm;