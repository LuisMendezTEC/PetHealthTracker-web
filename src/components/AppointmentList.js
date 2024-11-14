import React, { useState, useEffect } from 'react';
import useDecodedToken from '../hooks/UseDecodedToken';

const AppointmentList = ({ citas, onCompleteAppointment }) => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCita, setSelectedCita] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ tipo: '', motivo: '', resultado: '' });
  const [currentCitaId, setCurrentCitaId] = useState(null);
  
  // Obtener ID del veterinario logeado desde el token decodificado
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

      onCompleteAppointment(currentCitaId); // Actualiza la lista de citas en el componente padre
      closeModal();
    } catch (error) {
      console.error('Error al completar la cita:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  // Filtrar citas para mostrar solo las del veterinario logeado
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
              <div
                key={cita.id}
                onClick={() => handleCardClick(cita.id)}
                className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${selectedCita === cita.id ? 'border-blue-500 border-2' : ''}`}
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {mascota ? mascota.nombre_mascota : 'Mascota desconocida'}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  <span className="font-semibold">Fecha:</span> {new Date(cita.fecha_cita).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">Hora:</span> {cita.hora_cita}
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold">Veterinario ID:</span> {idVeterinario}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(cita.id);
                  }}
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Completar Cita
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Completar Cita</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tipo</label>
              <input
                type="text"
                name="tipo"
                value={modalData.tipo}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Motivo</label>
              <input
                type="text"
                name="motivo"
                value={modalData.motivo}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Resultado</label>
              <input
                type="text"
                name="resultado"
                value={modalData.resultado}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={handleComplete} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
