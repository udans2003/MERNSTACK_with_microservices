
import { useEffect, useState } from "react";
import API from "../api/MedicineApi";

import Header from "../components/Header";
import MedicineTable from "../components/MedicineTable";
import MedicineModal from "../components/MedicineModal";
import MedicineForm from "../components/MedicineForm";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [medicines, setMedicines] = useState([]);

    const [selectedMedicine, setSelectedMedicine] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [submitError, setSubmitError] = useState("");

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

        <div className="flex min-h-screen bg-gray-100">
           <Sidebar />
            <div className="flex-1 p-8">

                <Header
                    onAddMedicine={() => {
                        setSelectedMedicine(null);
                        setSubmitError("");
                        setIsModalOpen(true);
                    }}
                />

                <div className="mb-6">

                    <input
                       type="text"
                       placeholder="Search medicine..."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full md:w-96 border rounded-lg px-4 py-2"
                    />

                </div>

                <MedicineTable
                medicines={filteredMedicines}
                onEdit={(medicine) => {
                    
                   if (medicine.status === "Inactive") return;

                       setSelectedMedicine(medicine);

                       setSubmitError("");

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

                                 setSubmitError("");

                 setIsModalOpen(false);

             }}
                >

            <MedicineForm

                               medicine={selectedMedicine}
                               submitError={submitError}
                                                   onSave= {async(data) => {

                               setSubmitError("");

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

                                   setSelectedMedicine(null);

                                   setIsModalOpen(false);

                               } catch (error) {

                                   console.error(error);

                                   setSubmitError(
                                       error?.response?.data?.message ||
                                       error?.response?.data?.errors?.[0]?.message ||
                                       error.message ||
                                       "Failed to save medicine"
                                   );

                               }

                           }else {

                               try {

                                   await API.post("/medicines", data);

                                   await loadMedicines();

                                   setSelectedMedicine(null);

                                   setIsModalOpen(false);

                               } catch (error) {

                                   console.error(error);

                                   setSubmitError(
                                       error?.response?.data?.message ||
                                       error?.response?.data?.errors?.[0]?.message ||
                                       error.message ||
                                       "Failed to save medicine"
                                   );

                               }

                           }

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

