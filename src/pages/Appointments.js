import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentList from '../components/AppointmentList';

const Appointments = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t } = useTranslation();

  const fetchCitas = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/citas/');
      const data = await response.json();
      if (response.ok) {
        setCitas(data.data);
        if (data.data.length === 0) {
          setError('No se encontraron citas');
        }
      } else {
        setError(data.message || 'Error al cargar las citas');
      }
    } catch (error) {
      setError('Error de conexión al servidor');
      console.error('Error fetching citas:', error);
    }
    setLoading(false);
  };

  // Función para eliminar la cita completada del estado
  const onCompleteAppointment = (completedCitaId) => {
    setCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== completedCitaId));
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('appointments.page_title')}</h1>
        <p className="text-gray-600 dark:text-gray-300">{t('appointments.page_subtitle')}</p>
      </div>

      {/* Sección de resultados con fondo ajustado para modo oscuro */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-600">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{t('appointments.loading_appointments')}</span>
            </div>
          ) : (
            citas.length > 0 ? (
              <AppointmentList citas={citas} onCompleteAppointment={onCompleteAppointment} />
            ) : !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">{t('appointments.no_appointments')}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t('appointments.no_appointments_action')}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;