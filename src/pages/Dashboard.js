import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pie, PieChart, Tooltip, ResponsiveContainer, Cell } from "recharts";
import PDFGenerator from "../components/PDFGenerator"; // Importar el componente de generación de PDF

const Dashboard = () => {
  const { t } = useTranslation();
  const [appointmentStats, setAppointmentStats] = useState({
    scheduled: 0,
    completed: 0,
    pending: 0,
  });
  const [activeUserData, setActiveUserData] = useState({
    clients: 0,
    staff: 0,
    total: 0,
  });
  const [totalPets, setTotalPets] = useState(0);
  const [avgAppointmentsPerVet, setAvgAppointmentsPerVet] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAppointmentStats(data.appointment_stats);
          setActiveUserData(data.active_users);
          setTotalPets(data.total_pets);
          setAvgAppointmentsPerVet(data.avg_appointments_per_vet);
        } else {
          console.error("Error al cargar los datos del dashboard:", data);
        }
      } catch (error) {
        console.error("Error de conexión al servidor:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const COLORS = ["#4A90E2", "#50E3C2"];

  const userData = [
    { name: t("dashboard.clients"), value: activeUserData.clients },
    { name: t("dashboard.staff"), value: activeUserData.staff },
  ];

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">{t("dashboard.page_title")}</h1>

      {/* Botón para Generar PDF */}
      <div className="flex justify-end mb-4">
        <PDFGenerator
          appointmentStats={appointmentStats}
          activeUserData={activeUserData}
          totalPets={totalPets}
          avgAppointmentsPerVet={avgAppointmentsPerVet}
        />
      </div>

      {/* Resumen de Citas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">
            {t("dashboard.scheduled_appointments")}
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {appointmentStats.scheduled}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">
            {t("dashboard.completed_appointments")}
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {appointmentStats.completed}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-2">
            {t("dashboard.pending_appointments")}
          </h2>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {appointmentStats.pending}
          </p>
        </div>
      </div>

      {/* Usuarios Activos */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {t("dashboard.active_users")}
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={userData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {userData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Total de Mascotas */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 text-center">
        <h2 className="text-lg font-semibold mb-4">
          {t("dashboard.total_pets")}
        </h2>
        <p className="text-6xl font-bold text-purple-600 dark:text-purple-400">
          {totalPets}
        </p>
      </div>

      {/* Promedio de Citas por Veterinario */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8 text-center">
        <h2 className="text-lg font-semibold mb-4">
          {t("dashboard.avg_appointments_per_vet")}
        </h2>
        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          {avgAppointmentsPerVet.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;