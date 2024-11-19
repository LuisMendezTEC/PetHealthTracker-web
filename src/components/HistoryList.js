import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const HistoryList = ({ historiales }) => {
  const [mascotas, setMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHistorial, setSelectedHistorial] = useState(null); // Para controlar qué historial está expandido
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token dinámicamente
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [mascotasRes, clientesRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_BASE_URL}/mascotas/`, { headers }),
          fetch(`${process.env.REACT_APP_API_BASE_URL}/clientes/`, { headers }),
        ]);

        if (!mascotasRes.ok || !clientesRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const mascotasData = await mascotasRes.json();
        const clientesData = await clientesRes.json();

        console.log('Mascotas:', mascotasData.data);
        console.log('Clientes:', clientesData.data);
        console.log('Historiales:', historiales);

        setMascotas(mascotasData.data || []);
        setClientes(clientesData.data || []);
      } catch (err) {
        setError(err.message || 'Error de conexión al servidor');
      }
      setLoading(false);
    };
    fetchData();
  }, [historiales]); // Agrega `historiales` como dependencia

  const handleCardClick = (id) => {
    setSelectedHistorial(selectedHistorial === id ? null : id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('historyList.history')}</h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">{t('historyList.loading')}</p>
      ) : error ? (
        <p className="text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historiales.map((historial) => {
            const mascota = mascotas.find(m => Number(m.id) === Number(historial.id_mascota));
            const cliente = clientes.find(c => c.id === (mascota ? mascota.id_dueño : null));

            return (
              <div
                key={historial.id}
                onClick={() => handleCardClick(historial.id)}
                className={`p-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${
                  selectedHistorial === historial.id ? 'border-blue-500 dark:border-blue-400 border-2' : ''
                }`}
              >
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {mascota ? mascota.nombre_mascota : t('historyList.unknown_pet')}
                </h3>
                {cliente && (
                  <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                    <span className="font-semibold">{t('historyList.owner')}:</span> {cliente.nombre_usuario}
                  </p>
                )}
                <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">
                  <span className="font-semibold">{t('historyList.date')}:</span> {new Date(historial.fecha).toLocaleDateString()}
                </p>

                {/* Detalles adicionales visibles solo cuando se hace clic */}
                {selectedHistorial === historial.id && (
                  <div className="mt-4">
                    {mascota && (
                      <p className="text-gray-500 dark:text-gray-300 text-sm">
                        <span className="font-semibold">{t('historyList.breed')}:</span> {mascota.raza}
                      </p>
                    )}
                    <p className="text-gray-700 dark:text-gray-200 mt-2">
                      <span className="font-semibold">{t('historyList.type')}:</span> {historial.tipo}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mt-2">
                      <span className="font-semibold">{t('historyList.description')}:</span> {historial.descripcion}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200 mt-2">
                      <span className="font-semibold">{t('historyList.result')}:</span> {historial.resultado}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryList;