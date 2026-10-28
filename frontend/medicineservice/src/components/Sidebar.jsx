import { FiGrid, FiHeart, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-[#14213d] text-white shadow-xl md:flex">
      <div className="border-b border-white/10 px-7 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2ec4b6] text-xl font-bold text-[#14213d]">
            +
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">siHealth</h1>
            <p className="text-xs text-slate-300">Pharmacy management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-7">
        <button
          className="flex w-full items-center gap-3 rounded-xl bg-[#2ec4b6] px-4 py-3 text-left text-sm font-semibold text-[#14213d] shadow-lg shadow-[#2ec4b6]/10 transition hover:bg-[#43d3c5]"
        >
          <FiGrid size={18} />
          Dashboard
        </button>
        {/* <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
          <FiHeart size={18} />
          Inventory health
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
          <FiSettings size={18} />
          Settings
        </button> */}
      </nav>

      <div className="mx-4 mb-5 rounded-2xl bg-white/10 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8be4dc]">Need help?</p>
        <p className="mt-1 text-sm text-slate-300">Keep your medicine records up to date.</p>
      </div>
    </aside>
  );
}