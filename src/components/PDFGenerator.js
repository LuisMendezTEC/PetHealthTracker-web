import React from "react";
import { pdf } from "@react-pdf/renderer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import useDecodedToken from "../hooks/UseDecodedToken.js";
import { useTranslation } from "react-i18next";

// Definir estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f8fafc",
    padding: 30,
  },
  titleSection: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: "#2d3748",
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#4a5568",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#e2e8f0",
    borderWidth: 1,
    width: "30%",
    textAlign: "center",
  },
  statTitle: {
    fontSize: 14,
    color: "#4a5568",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 22,
    color: "#2b6cb0",
    fontWeight: "bold",
  },
  userSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#edf2f7",
    borderRadius: 5,
  },
  userText: {
    fontSize: 14,
    color: "#4a5568",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
});

// Componente del PDF
const PDFDocument = ({
  appointmentStats,
  activeUserData,
  totalPets,
  avgAppointmentsPerVet,
  name,
}) => {
  const { t } = useTranslation(); // Hook de i18n para traducción

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Título del reporte */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{t("pdfGenerator.report_title")}</Text>
        </View>

        {/* Resumen de Citas */}
        <Text style={styles.sectionTitle}>
          {t("pdfGenerator.appointment_summary")}
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>
              {t("pdfGenerator.scheduled_appointments")}
            </Text>
            <Text style={styles.statValue}>
              {appointmentStats?.scheduled || 0}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>
              {t("pdfGenerator.completed_appointments")}
            </Text>
            <Text style={styles.statValue}>
              {appointmentStats?.completed || 0}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>
              {t("dashboard.pending_appointments")}
            </Text>
            <Text style={styles.statValue}>
              {appointmentStats?.pending || 0}
            </Text>
          </View>
        </View>

        {/* Usuarios Activos */}
        <Text style={styles.sectionTitle}>
          {t("pdfGenerator.active_users")}
        </Text>
        <View style={styles.userSection}>
          <Text style={styles.userText}>
            {t("dashboard.clients")}: {activeUserData?.clients || 0}
          </Text>
          <Text style={styles.userText}>
            {t("dashboard.staff")}: {activeUserData?.staff || 0}
          </Text>
          <Text style={styles.userText}>
            {t("dashboard.active_users")}: {activeUserData?.total || 0}
          </Text>
        </View>

        {/* Total de Mascotas */}
        <Text style={styles.sectionTitle}>{t("dashboard.total_pets")}</Text>
        <View style={styles.userSection}>
          <Text style={styles.userText}>
            {t("dashboard.total_pets")}: {totalPets || 0}
          </Text>
        </View>

        {/* Promedio de Citas por Veterinario */}
        <Text style={styles.sectionTitle}>
          {t("dashboard.avg_appointments_per_vet")}
        </Text>
        <View style={styles.userSection}>
          <Text style={styles.userText}>
            {avgAppointmentsPerVet?.toFixed(2) || 0}
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          {t("pdfGenerator.generated_by")} {name} {t("pdfGenerator.the")}{" "}
          {new Date().toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
};

// Función para generar y descargar el PDF
const generatePDF = async (data) => {
  try {
    const blob = await pdf(
      <PDFDocument
        appointmentStats={data.appointmentStats}
        activeUserData={data.activeUserData}
        totalPets={data.totalPets}
        avgAppointmentsPerVet={data.avgAppointmentsPerVet}
        name={data.name}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reporte-dashboard-${
      new Date().toISOString().split("T")[0]
    }.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Error al generar el PDF. Por favor, intente nuevamente.");
  }
};

// Componente PDFGenerator
export const PDFGenerator = ({
  appointmentStats,
  activeUserData,
  totalPets,
  avgAppointmentsPerVet,
}) => {
  const undecodedToken = useDecodedToken();
  const name = undecodedToken?.nombre;
  const handleGeneratePDF = () => {
    generatePDF({
      appointmentStats,
      activeUserData,
      totalPets,
      avgAppointmentsPerVet,
      name,
    });
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
    >
      {useTranslation().t("pdfGenerator.generate")}
    </button>
  );
};

export default PDFGenerator;