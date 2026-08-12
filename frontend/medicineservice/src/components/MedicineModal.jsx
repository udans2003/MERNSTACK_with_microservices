function MedicineModal({ isOpen,

    onClose,

    title,

    children }) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

                <div className="flex justify-between items-center border-b px-6 py-4">

                    <h2 className="text-2xl font-bold">

    {title}

</h2>

                    <button
                        onClick={onClose}
                        className="text-2xl hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                <div className="p-6">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default MedicineModal;