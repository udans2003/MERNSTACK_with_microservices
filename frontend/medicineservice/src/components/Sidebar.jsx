export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-00 text-white flex flex-col min-h-screen shadow-lg">

      {/* Logo */}

      <div className="border-b border-slate-700 p-10">

        <h1 className="text-3xl font-bold tracking-wide text-blue-400">
          siHealth
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Pharmacy Management
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4">

        <button
          className="w-full flex items-center gap-3 bg-blue-500 px-4 py-3 rounded-lg text-left font-semibold hover:bg-blue-700 transition"
        >
          📊 Dashboard
        </button>

      </nav>

    </aside>
  );
}

// export default Sidebar;