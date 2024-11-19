import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDecodedToken from '../hooks/UseDecodedToken';
import AppointmentCard from './AppointmentCard';
import CompleteAppointmentModal from './CompleteAppointmentModal';

const AppointmentList = ({ citas, onCompleteAppointment }) => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCita, setSelectedCita] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ tipo: '', motivo: '', resultado: '' });
  const [currentCitaId, setCurrentCitaId] = useState(null);
  const { t } = useTranslation();
  
  const decodedToken = useDecodedToken();
  const idVeterinario = decodedToken?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': `Bearer ${token}` }; // Crear headers dinámicamente

        const mascotasRes = await fetch(`${process.env.REACT_APP_API_BASE_URL}/mascotas/`, { headers });
        if (!mascotasRes.ok) throw new Error('Error al cargar los datos de mascotas');

        const mascotasData = await mascotasRes.json();
        setMascotas(mascotasData.data || []);
      } catch (err) {
        setError(err.message || 'Error de conexión al servidor');
      }
      setLoading(false);
    };
    fetchData();
  }, []); // Sin dependencias relacionadas con headers

  const handleCardClick = (id) => {
    setSelectedCita(selectedCita === id ? null : id);
  };

  const openModal = (id) => {
    setCurrentCitaId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({ tipo: '', motivo: '', resultado: '' });
    setCurrentCitaId(null);
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener token dinámicamente
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/citas/${currentCitaId}/completar`, {
        method: 'POST',
        headers,
        body: JSON.stringify(modalData),
      });
      if (!response.ok) throw new Error('Error al completar la cita');

      onCompleteAppointment(currentCitaId);
      closeModal();
    } catch (error) {
      console.error('Error al completar la cita:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const filteredCitas = citas.filter(cita => cita.id_veterinario === idVeterinario);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('appointmentsList.title')}</h2>
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">{t('appointmentsList.loading')}</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-300">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCitas.map((cita) => {
            const mascota = mascotas.find(m => m.id === cita.id_mascota);
            return (
              <AppointmentCard
                key={cita.id}
                cita={{ ...cita, isSelected: selectedCita === cita.id }}
                mascota={mascota}
                idVeterinario={idVeterinario}
                onCardClick={handleCardClick}
                onOpenModal={openModal}
              />
            );
          })}
        </div>
      )}

      {showModal && (
        <CompleteAppointmentModal
          modalData={modalData}
          onClose={closeModal}
          onChange={handleChange}
          onSave={handleComplete}
        />
      )}
    </div>
  );
};

export default AppointmentList;