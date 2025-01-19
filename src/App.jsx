import React, { useState } from 'react';
import Header from "./assets/components/Header";
import Balance from "./assets/components/Balance";
import * as XLSX from 'xlsx'; // Importamos la librería XLSX

const App = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Sueldo", amount: 0, type: "income" },
    { id: 2, name: "Luz", amount: 0, type: "expense" },
    { id: 3, name: "Agua", amount: 0, type: "expense" },
    { id: 4, name: "Supermercado", amount: 0, type: "expense" },
    { id: 5, name: "Otros", amount: 0, type: "expense" },
    { id: 6, name: "Ingresos Extra", amount: 0, type: "income" },
  ]);

  // Función para actualizar el monto de una categoría
  const updateCategoryAmount = (id, newAmount) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, amount: newAmount } : category
    );
    setCategories(updatedCategories);
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    const exportData = categories.map((category) => ({
      "Categoría": category.name,
      "Monto": category.amount,
      "Tipo": category.type,
    }));

    // Calcular totales
    const totalIncome = categories.filter(category => category.type === 'income').reduce((sum, category) => sum + category.amount, 0);
    const totalExpense = categories.filter(category => category.type === 'expense').reduce((sum, category) => sum + category.amount, 0);

    // Agregar totales al final
    exportData.push(
      { "Categoría": "Total Ingresos", "Monto": totalIncome, "Tipo": "income" },
      { "Categoría": "Total Gastos", "Monto": totalExpense, "Tipo": "expense" }
    );

    // Crear hoja de cálculo y archivo Excel
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    XLSX.writeFile(wb, "gastos-ingresos.xlsx");
  };

  return (
    <div className="container bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center p-4">
      <Header />
      <Balance categories={categories} />

      {/* Contenedor para las secciones de ingresos y egresos */}
      <div className="income-expense-container">
        {/* Ingresos */}
        <div className="section">
          <h2 className="text-2xl text-white mb-4">Ingresos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(category => category.type === 'income').map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <input
                  type="number"
                  value={category.amount}
                  onChange={(e) => updateCategoryAmount(category.id, parseFloat(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Egresos */}
        <div className="section">
          <h2 className="text-2xl text-white mb-4">Egresos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(category => category.type === 'expense').map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <input
                  type="number"
                  value={category.amount}
                  onChange={(e) => updateCategoryAmount(category.id, parseFloat(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botón para exportar */}
      <button
        onClick={exportToExcel}
        className="mt-6 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
      >
        Exportar a Excel
      </button>
    </div>
  );
};

export default App;
