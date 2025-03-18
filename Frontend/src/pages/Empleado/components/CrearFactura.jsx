import React, { useState } from 'react';

export const CrearFactura = ({ onClose, onConfirm }) => {
  const [nombreVendedor, setNombreVendedor] = useState('');
  const [nombreComprador, setNombreComprador] = useState('');
  const [idVendedor, setIdVendedor] = useState('');
  const [idComprador, setIdComprador] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ nombreVendedor, nombreComprador, idVendedor, idComprador });
  };

  return (
    <div className="mt-16 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirmar Pedido</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre del Vendedor</label>
            <input
              type="text"
              className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={nombreVendedor}
              onChange={(e) => setNombreVendedor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre del Comprador</label>
            <input
              type="text"
              className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={nombreComprador}
              onChange={(e) => setNombreComprador(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID del Vendedor</label>
            <input
              type="text"
              className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={idVendedor}
              onChange={(e) => setIdVendedor(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ID del Comprador</label>
            <input
              type="text"
              className="bg-white w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              value={idComprador}
              onChange={(e) => setIdComprador(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-8 hover:bg-red-600 transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Confirmar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearFactura;