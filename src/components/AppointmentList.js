import React, { useState, useEffect } from 'react';
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
  
  const decodedToken = useDecodedToken();
  const idVeterinario = decodedToken?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mascotasRes = await fetch('http://127.0.0.1:8000/check-table/?tabla=Mascotas');
        if (!mascotasRes.ok) throw new Error('Error al cargar los datos de mascotas');
        
        const mascotasData = await mascotasRes.json();
        setMascotas(mascotasData.data || []);
      } catch (err) {
        setError(err.message || 'Error de conexión al servidor');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
      const response = await fetch(`http://127.0.0.1:8000/citas/${currentCitaId}/completar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Citas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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
