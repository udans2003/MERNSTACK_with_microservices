import { FiBell, FiPlus } from "react-icons/fi";

function Header({ onAddMedicine }) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold text-[#2a9d8f]">PHARMACY OVERVIEW</p>
        <h1 className="text-3xl font-bold tracking-tight text-[#17233c] sm:text-4xl">Medicine management</h1>
        <p className="mt-2 text-sm text-slate-500">Keep your inventory organized and ready for every patient.</p>
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-500 shadow-sm transition hover:border-[#2ec4b6] hover:text-[#2a9d8f] sm:block">
          <FiBell size={18} />
        </button>
        <button onClick={onAddMedicine} className="flex items-center justify-center gap-2 rounded-xl bg-[#2a9d8f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2a9d8f]/20 transition hover:bg-[#238b7f]">
          <FiPlus size={18} />
          Add medicine
        </button>
      </div>
    </div>
  );
}

export default Header;