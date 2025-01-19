import React from "react";

const ExpenseGrid = ({ categories, updateCategoryAmount, updateCategoryName }) => {
  // Filtrar categorías por tipo
  const ingresos = categories.filter((category) => category.type === "income");
  const egresos = categories.filter((category) => category.type === "expense");

  // Manejar cambios en los montos
  const handleInputChange = (id, value) => {
    const newAmount = value === "" ? 0 : parseFloat(value);
    updateCategoryAmount(id, newAmount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Ingresos */}
      <div className="bg-green-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Ingresos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ingresos.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-green-300"
            >
              <h3 className="text-lg font-medium text-green-700">
                {category.name}
              </h3>
              <input
                type="number"
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={category.amount}
                onChange={(e) =>
                  handleInputChange(category.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Egresos */}
      <div className="bg-red-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Egresos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {egresos.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-red-300"
            >
              {category.editable ? (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                  value={category.name}
                  onChange={(e) => updateCategoryName(category.id, e.target.value)}
                  placeholder="Especificar gasto"
                />
              ) : (
                <p className="text-lg font-semibold text-red-500">{category.name}</p>
              )}
              <input
                type="number"
                className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                value={category.amount || 0}
                onChange={(e) => handleInputChange(category.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseGrid;
