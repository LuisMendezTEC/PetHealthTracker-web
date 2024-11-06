import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import useDecodedToken from '../hooks/UseDecodedToken.js';





// Definir estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    padding: 30,
  },
  titleSection: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    color: '#2d3748',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  period: {
    fontSize: 12,
    color: '#4a5568',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#4a5568',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    width: '30%',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 22,
    color: '#2b6cb0',
    fontWeight: 'bold',
  },
  userSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#edf2f7',
    borderRadius: 5,
  },
  userText: {
    fontSize: 14,
    color: '#4a5568',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
});

// Componente del PDF
const PDFDocument = ({ appointmentStats, activeUserData, performanceData, startDate, endDate, name }) => (


  <Document>
    <Page size="A4" style={styles.page}>
      {/* Título y período del reporte */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Reporte del Dashboard</Text>
        <Text style={styles.period}>Período: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</Text>
      </View>

      {/* Resumen de Citas */}
      <Text style={styles.sectionTitle}>Resumen de Citas</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Citas Programadas</Text>
          <Text style={styles.statValue}>{appointmentStats.scheduled}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Citas Realizadas</Text>
          <Text style={styles.statValue}>{appointmentStats.completed}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Citas Canceladas</Text>
          <Text style={styles.statValue}>{appointmentStats.canceled}</Text>
        </View>
      </View>

      {/* Usuarios Activos */}
      <Text style={styles.sectionTitle}>Usuarios Activos</Text>
      <View style={styles.userSection}>
        {activeUserData.map((user, index) => (
          <Text key={index} style={styles.userText}>
            {user.name}: {user.value} usuarios (Frecuencia: {user.frequency}%)
          </Text>
        ))}
      </View>

      {/* Desempeño de la Plataforma */}
      <Text style={styles.sectionTitle}>Desempeño de la Plataforma</Text>
      <View style={styles.userSection}>
        {performanceData.map((metric, index) => (
          <Text key={index} style={styles.userText}>
            {metric.name}: {metric.value}
          </Text>
        ))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        {console.log(name)}
        Generado por {name} el {new Date().toLocaleString()}
      </Text>
    </Page>
  </Document>
);

// Función para generar y descargar el PDF
const generatePDF = async (data) => {

  
  try {
    const blob = await pdf(
      <PDFDocument 
        appointmentStats={data.appointmentStats}
        activeUserData={data.activeUserData}
        performanceData={data.performanceData}
        startDate={data.startDate}
        endDate={data.endDate}
        name={data.name}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte-dashboard-${data.startDate.toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    alert('Error al generar el PDF. Por favor, intente nuevamente.');
  }
};

export const PDFGenerator = ({ appointmentStats, activeUserData, performanceData, startDate, endDate }) => {
  const undecodedToken = useDecodedToken();
  const name = undecodedToken?.nombre;
  const handleGeneratePDF = () => {
    generatePDF({
      appointmentStats,
      activeUserData,
      performanceData,
      startDate,
      endDate, 
      name
    });
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
    >
      Generar PDF
    </button>
  );
};

export default PDFGenerator;
