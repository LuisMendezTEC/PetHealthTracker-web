import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddAppointmentModal = ({ onClose, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    id_mascota: '',
    fecha_cita: '',
    hora_cita: '',
    id_veterinario: '',
  });

  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    // Fetch mascotas
    const fetchMascotas = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/mascotas/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setMascotas(data.data || []);
    };

    // Fetch veterinarios
    const fetchVeterinarios = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/funcionarios/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        const vets = data.data.filter((funcionario) => funcionario.puesto === 'Veterinario');
        setVeterinarios(vets || []);
      }
    };

    fetchMascotas();
    fetchVeterinarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {t('add_appointments.create_appointment')}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">{t('add_appointments.pet')}</label>
          <select
            name="id_mascota"
            value={formData.id_mascota}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">{t('add_appointments.select_pet')}</option>
            {mascotas.map((mascota) => (
              <option key={mascota.id} value={mascota.id}>
                {mascota.nombre_mascota}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">{t('add_appointments.veterinarian')}</label>
          <select
            name="id_veterinario"
            value={formData.id_veterinario}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">{t('add_appointments.select_veterinarian')}</option>
            {veterinarios.map((vet) => (
              <option key={vet.id} value={vet.id}>
                {vet.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">{t('add_appointments.date')}</label>
          <input
            type="date"
            name="fecha_cita"
            value={formData.fecha_cita}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300">{t('add_appointments.time')}</label>
          <input
            type="time"
            name="hora_cita"
            value={formData.hora_cita}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
          >
            {t('add_appointments.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {t('add_appointments.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;