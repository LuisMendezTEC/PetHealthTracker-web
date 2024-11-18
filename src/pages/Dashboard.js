import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from 'react-i18next';
import Modal from 'react-modal';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PDFGenerator from '../components/PDFGenerator.js';

const Dashboard = () => {
  const { t } = useTranslation();
  const [appointmentStats, setAppointmentStats] = useState({
    scheduled: 0,
    completed: 0,
    canceled: 0,
  });
  const [activeUserData, setActiveUserData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    // Datos de ejemplo, luego todo esto se conecta al backend para mostrar las stats reales
    setAppointmentStats({
      scheduled: 40,
      completed: 30,
      canceled: 10,
    });
    setActiveUserData([
      { name: 'Veterinarios', value: 5, frequency: 15 },
      { name: 'Clientes', value: 20, frequency: 60 },
    ]);
    setPerformanceData([
      { name: 'Carga Promedio', value: 200 },
      { name: 'Incidencias', value: 2 },
    ]);
  }, [startDate, endDate]);

  const COLORS = ['#4A90E2', '#50E3C2', '#F5A623'];

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.page_title')}</h1>
  
      {/* Filtros de Fecha */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">{t('dashboard.start_date')}</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm"
            dateFormat="dd/MM/yyyy"
            placeholderText={t('dashboard.date_placeholder')}
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">{t('dashboard.end_date')}</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded-md w-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm"
            dateFormat="dd/MM/yyyy"
            placeholderText={t('dashboard.date_placeholder')}
          />
        </div>
        <PDFGenerator
          appointmentStats={appointmentStats}
          activeUserData={activeUserData}
          performanceData={performanceData}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
  
      {/* Resumen de Citas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">{t('dashboard.scheduled_appointments')}</h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{appointmentStats.scheduled}</p>
          <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded">
            {t('dashboard.view_more')}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">{t('dashboard.completed_appointments')}</h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{appointmentStats.completed}</p>
          <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded">
            {t('dashboard.view_more')}
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">{t('dashboard.canceled_appointments')}</h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{appointmentStats.canceled}</p>
          <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded">
            {t('dashboard.view_more')}
          </button>
        </div>
      </div>
  
      {/* Usuarios Activos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.active_users')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={activeUserData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {activeUserData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          </PieChart>
        </ResponsiveContainer>
        <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded">
          {t('dashboard.view_more')}
        </button>
      </div>
  
      {/* Frecuencia de Uso */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.usage_frequency')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activeUserData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
        <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded">
          {t('dashboard.view_more')}
        </button>
      </div>
  
      {/* Desempeño de la Plataforma */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">{t('dashboard.platform_performance')}</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#7ED321" />
          </BarChart>
        </ResponsiveContainer>
        <button onClick={() => openModal(t('dashboard.details'))} className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded">
          {t('dashboard.view_more')}
        </button>
      </div>
  
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-800 dark:text-gray-100 mx-auto max-w-lg p-8 lg:w-1/2 sm:w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">{t('dashboard.details')}</h2>
          <p>{modalContent}</p>
          <button onClick={closeModal} className="mt-6 px-4 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded">
            {t('dashboard.close')}
          </button>
        </div>
      </Modal>
    </div>
  );
};
  

export default Dashboard;