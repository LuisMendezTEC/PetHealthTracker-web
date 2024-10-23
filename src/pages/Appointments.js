import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/AppointmentList';

const Appointments = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCitas = async () => {
    const response = await fetch('http://127.0.0.1:8000/citas/');
    const data = await response.json();
    if (response.ok) {
      setCitas(data.data);
    } else {
      console.error('Error fetching citas:', data.message);
    }
  };

  useEffect(() => {
    fetchCitas();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? <p>Cargando citas...</p> : <AppointmentList citas={citas} />}
    </div>
  );
};

export default Appointments;