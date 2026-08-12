import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

function MedicineTable({ medicines, onEdit, onDelete, onRestore }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="p-3 text-left">Medicine Name</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Manufacturer</th>
                        <th className="p-3 text-left">Stock</th>
                        <th className="p-3 text-left">Expiry Date</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {medicines.length === 0 ? (
                        <tr>
                            <td
                                colSpan="6"
                                className="text-center py-10 text-gray-500"
                            >
                                No medicines available
                            </td>
                        </tr>
                    ) : (
                        medicines.map((medicine) => (
                            <tr
                                key={medicine.medicineCode}
                                className={`border-b hover:bg-gray-50 ${
                                    medicine.status === "Inactive"
                                        ? "bg-gray-100 text-gray-400"
                                        : ""
                                }`}
                            >
                                <td className="p-3">
                                    {medicine.medicineName}
                                </td>

                                <td className="p-3">
                                    {medicine.category}
                                </td>

                                <td className="p-3">
                                    {medicine.manufacturer}
                                </td>

                                <td className="p-3">
                                    {medicine.stock}
                                </td>

                                <td className="p-3">
                                    {medicine.expiryDate
                                        ? new Date(medicine.expiryDate).toISOString().split("T")[0]
                                        : "-"}
                                </td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            medicine.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {medicine.status}
                                    </span>
                                </td>

                                <td className="p-3 text-center">
                                    <div className="flex justify-center gap-2">
                                        {medicine.status === "Active" ? (
                                            <>
                            <button
                                onClick={() => onEdit(medicine)}
                                className="hover:bg-gray-300 text-black p-2 rounded-lg transition"
                                title="Edit Medicine"
>
                               <MdOutlineModeEdit size={25} />
                            </button>

                            <button
                                onClick={() => onDelete(medicine.medicineCode)}
                                className=" hover:bg-gray-300 text-black p-2 rounded-lg transition"
                                title="Delete Medicine"
>
                               <MdDeleteOutline size={25} />
                            </button>
                                            </>
                                        ) : (
                            <button
                                onClick={() => onRestore(medicine.medicineCode)}
                                className=" hover:bg-gray-300 text-black p-2 rounded-lg transition"
                                title="Restore Medicine"
>
                              <FaUndo size={20} />
                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default MedicineTable;