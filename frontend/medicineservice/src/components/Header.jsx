function Header({ onAddMedicine }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Medicine Management
        </h1>

        <p className="text-gray-500">
          Manage medicines easily
        </p>
      </div>

      <button
        onClick={onAddMedicine}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
      >
        + Add Medicine
      </button>
    </div>
  );
}

export default Header;