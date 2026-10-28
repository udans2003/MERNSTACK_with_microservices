
import { useEffect, useState } from "react";
import API from "../api/MedicineApi";

import Header from "../components/Header";
import MedicineTable from "../components/MedicineTable";
import MedicineModal from "../components/MedicineModal";
import MedicineForm from "../components/MedicineForm";
import Sidebar from "../components/Sidebar";
import { FiActivity, FiAlertCircle, FiBox, FiSearch } from "react-icons/fi";

function Dashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [medicines, setMedicines] = useState([]);

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
);

    const loadMedicines = async () => {

    try {

        const response = await API.get("/medicines");

        setMedicines(response.data);

    } catch (error) {

        console.error(error);

    }

};

    useEffect(() => {

    loadMedicines();

}, []);

    return (

        <div className="flex min-h-screen bg-[#f5f7fb]">
           <Sidebar />
            <div className="min-w-0 flex-1 px-5 py-6 sm:px-8 sm:py-9 lg:px-12">

                <Header
                    onAddMedicine={() => {
                        setSelectedMedicine(null);
                        setIsModalOpen(true)}}
                />

                <div className="mb-7 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between"><span className="rounded-xl bg-[#e4f7f4] p-2.5 text-[#2a9d8f]"><FiBox /></span><span className="text-xs font-semibold text-slate-400">TOTAL</span></div>
                        <p className="text-3xl font-bold text-[#17233c]">{medicines.length}</p><p className="mt-1 text-sm text-slate-500">Medicines tracked</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between"><span className="rounded-xl bg-[#eef0ff] p-2.5 text-[#5964d8]"><FiActivity /></span><span className="text-xs font-semibold text-slate-400">ACTIVE</span></div>
                        <p className="text-3xl font-bold text-[#17233c]">{medicines.filter((medicine) => medicine.status === "Active").length}</p><p className="mt-1 text-sm text-slate-500">Available in inventory</p>
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between"><span className="rounded-xl bg-[#fff3df] p-2.5 text-[#e5983e]"><FiAlertCircle /></span><span className="text-xs font-semibold text-slate-400">INACTIVE</span></div>
                        <p className="text-3xl font-bold text-[#17233c]">{medicines.filter((medicine) => medicine.status === "Inactive").length}</p><p className="mt-1 text-sm text-slate-500">Need your attention</p>
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div><h2 className="text-lg font-bold text-[#17233c]">Your inventory</h2><p className="mt-1 text-sm text-slate-500">Review and manage all medicine records.</p></div>
                    <div className="relative w-full sm:w-80">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search medicines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2ec4b6] focus:ring-4 focus:ring-[#2ec4b6]/10" />
                    </div>
                </div>

                <MedicineTable
                medicines={filteredMedicines}
                onEdit={(medicine) => {
                    
                   if (medicine.status === "Inactive") return;

                       setSelectedMedicine(medicine);

                       setIsModalOpen(true);

                    }}
               onDelete={async (medicineCode) => {

               try {

                await API.delete(`/medicines/${medicineCode}`);

                await loadMedicines();

               } catch (error) {

                  console.error(error);

    }

}}
             onRestore={async (medicineCode) => {

            try {

                    await API.put(`/medicines/${medicineCode}/restore`);

                    await loadMedicines();

                } catch (error) {

                    console.error(error);

                }

            }}
            />

            <MedicineModal

                 title={

                     selectedMedicine

                         ? "Edit Medicine"

                         : "Add Medicine"

                 }
                                 isOpen={isModalOpen}
                                 onClose={() => {

                 setSelectedMedicine(null);

                 setIsModalOpen(false);

             }}
                >

            <MedicineForm

                               medicine={selectedMedicine}
                                                   onSave= {async(data) => {

                               if (selectedMedicine) {

                               try {

                                   console.log("Editing:", selectedMedicine.medicineCode);
                                   console.log("Data:", data);

                                   const response = await API.put(
                                       `/medicines/${selectedMedicine.medicineCode}`,
                                       data
                                   );

                                   console.log("Response:", response.data);

                                   await loadMedicines();

                               } catch (error) {

                                   console.error(error);

                               }

                           }else {

                               try {

                                   await API.post("/medicines", data);

                                   await loadMedicines();

                               } catch (error) {

                                   console.error(error);

                               }

                           }


                               setSelectedMedicine(null);

                               setIsModalOpen(false);

                           }}

                        onCancel={() => {

    setSelectedMedicine(null);

    setIsModalOpen(false);

}}
                    />

                </MedicineModal>

            </div>

        </div>

    );

}

export default Dashboard;
