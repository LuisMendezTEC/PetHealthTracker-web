import React from 'react';

const CompleteAppointmentModal = ({ modalData, onClose, onChange, onSave }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Completar Cita</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Tipo</label>
          <input
            type="text"
            name="tipo"
            value={modalData.tipo}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Motivo</label>
          <input
            type="text"
            name="motivo"
            value={modalData.motivo}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">Resultado</label>
          <input
            type="text"
            name="resultado"
            value={modalData.resultado}
            onChange={onChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteAppointmentModal;