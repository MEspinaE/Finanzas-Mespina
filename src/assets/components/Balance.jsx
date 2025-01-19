// src/components/Balance.jsx
import React from "react";

const Balance = ({ categories }) => {
  const totalIngresos = categories
    .filter((category) => category.type === "income")
    .reduce((acc, category) => acc + category.amount, 0);

  const totalEgresos = categories
    .filter((category) => category.type === "expense")
    .reduce((acc, category) => acc + category.amount, 0);

  const totalBalance = totalIngresos - totalEgresos;

  return (
    <div className="balance bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Balance Total</h2>
      <div className="flex justify-center space-x-4">
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Ingresos:</h3>
          <p className="text-2xl">${totalIngresos.toFixed(2)}</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-lg">
          <h3 className="text-lg">Egresos:</h3>
          <p className="text-2xl">${totalEgresos.toFixed(2)}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-gray-800">Balance Final:</h3>
        <p className={`text-2xl ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
          ${totalBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Balance;
