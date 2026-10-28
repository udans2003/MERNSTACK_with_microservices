import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { FaUndo } from "react-icons/fa";

function MedicineTable({ medicines, onEdit, onDelete, onRestore }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
                <thead className="border-b border-slate-100 bg-[#fbfcfe] text-xs uppercase tracking-wider text-slate-400">
                    <tr>
                        <th className="px-5 py-4 text-left">Medicine name</th><th className="px-5 py-4 text-left">Category</th><th className="px-5 py-4 text-left">Manufacturer</th><th className="px-5 py-4 text-left">Stock</th><th className="px-5 py-4 text-left">Expiry date</th><th className="px-5 py-4 text-left">Status</th><th className="px-5 py-4 text-center">Actions</th>
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
                                className={`border-b border-slate-100 transition hover:bg-[#f8fbfb] ${
                                    medicine.status === "Inactive"
                                        ? "bg-gray-100 text-gray-400"
                                        : ""
                                }`}
                            >
                                <td className="px-5 py-4 font-semibold text-[#17233c]">
                                    {medicine.medicineName}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {medicine.category}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {medicine.manufacturer}
                                </td>

                                <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                                    {medicine.stock}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {medicine.expiryDate
                                        ? new Date(medicine.expiryDate).toISOString().split("T")[0]
                                        : "-"}
                                </td>

                                <td className="px-5 py-4 text-sm text-slate-600">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                            medicine.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {medicine.status}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <div className="flex justify-center gap-2">
                                        {medicine.status === "Active" ? (
                                            <>
                            <button
                                onClick={() => onEdit(medicine)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-[#e4f7f4] hover:text-[#2a9d8f]"
                                title="Edit Medicine"
>
                               <MdOutlineModeEdit size={25} />
                            </button>

                            <button
                                onClick={() => onDelete(medicine.medicineCode)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-[#fff0ed] hover:text-[#d65a4a]"
                                title="Delete Medicine"
>
                               <MdDeleteOutline size={25} />
                            </button>
                                            </>
                                        ) : (
                            <button
                                onClick={() => onRestore(medicine.medicineCode)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-[#e4f7f4] hover:text-[#2a9d8f]"
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
        </div>
    );
}

export default MedicineTable;