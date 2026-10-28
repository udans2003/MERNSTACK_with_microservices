function MedicineModal({ isOpen,

    onClose,

    title,

    children }) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#14213d]/55 p-4 backdrop-blur-sm">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

                    <h2 className="text-xl font-bold text-[#17233c]">

    {title}

</h2>

                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="rounded-lg px-2 text-2xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
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