import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';

const Dashboard = () => {
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

  const generatePDF = () => {
    // aqui iria la logica del pdf @roosevelt
    alert("Generando PDF...");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Administración</h1>

      {/* Filtros de Fecha */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <label className="block text-gray-700 mb-1">Fecha de Inicio</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded-md w-full bg-white text-gray-700 shadow-sm"
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona fecha de inicio"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Fecha de Fin</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded-md w-full bg-white text-gray-700 shadow-sm"
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona fecha de fin"
          />
        </div>
        <button
          onClick={generatePDF}
          className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Generar PDF
        </button>
      </div>

      {/* Resumen de Citas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Citas Programadas</h2>
          <p className="text-3xl font-bold text-blue-600">{appointmentStats.scheduled}</p>
          <button onClick={() => openModal('Detalles de Citas Programadas')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Ver Más
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Citas Realizadas</h2>
          <p className="text-3xl font-bold text-green-600">{appointmentStats.completed}</p>
          <button onClick={() => openModal('Detalles de Citas Realizadas')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Ver Más
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">Citas Canceladas</h2>
          <p className="text-3xl font-bold text-red-600">{appointmentStats.canceled}</p>
          <button onClick={() => openModal('Detalles de Citas Canceladas')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Ver Más
          </button>
        </div>
      </div>

      {/* Usuarios Activos */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Usuarios Activos</h2>
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
        <button onClick={() => openModal('Detalles de Usuarios Activos')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Ver Más
        </button>
      </div>

      {/* Frecuencia de Uso */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Frecuencia de Uso por Rol</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activeUserData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="frequency" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
        <button onClick={() => openModal('Detalles de Frecuencia de Uso')} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Ver Más
        </button>
      </div>

      {/* Desempeño de la Plataforma */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Desempeño de la Plataforma</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#7ED321" />
          </BarChart>
        </ResponsiveContainer>
        <button onClick={() => openModal('Detalles de Desempeño de la Plataforma')} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
          Ver Más
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white rounded-lg shadow-lg text-gray-800 mx-auto max-w-lg p-8 lg:w-1/2 sm:w-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div>
          <h2 className="text-xl font-semibold mb-4">Detalles</h2>
          <p>{modalContent}</p>
          <button onClick={closeModal} className="mt-6 px-4 py-2 bg-gray-500 text-white rounded">
            Cerrar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;