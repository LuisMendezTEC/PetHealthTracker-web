import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AppointmentList from '../components/AppointmentList';
import AddAppointmentModal from '../components/AddAppointmentModal';

const Appointments = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const fetchCitas = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/citas/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleAddAppointment = async (newAppointment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/citas/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAppointment),
      });
      const data = await response.json();
      if (response.ok) {
        setCitas((prevCitas) => [...prevCitas, data]);
      } else {
        console.error('Error adding appointment:', data.message);
      }
    } catch (error) {
      console.error('Error connecting to server:', error);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('appointments.page_title')}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t('appointments.page_subtitle')}</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t('add_appointments.add')}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-400 dark:border-red-600">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 dark:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
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
              <AppointmentList citas={citas} onCompleteAppointment={(id) => setCitas(citas.filter(c => c.id !== id))} />
            ) : !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">{t('appointments.no_appointments')}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t('appointments.no_appointments_action')}</p>
              </div>
            )
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddAppointmentModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default Appointments;