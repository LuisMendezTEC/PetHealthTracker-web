import React, { useState, useEffect } from 'react';
import HistoryList from '../components/HistoryList';

const Histories = () => {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistoriales = async () => {
    const response = await fetch('http://127.0.0.1:8000/check-table/?tabla=Historial');
    const data = await response.json();
    if (response.ok) {
      setHistoriales(data.data);
    } else {
      console.error('Error fetching historiales:', data.message);
    }
  };

  useEffect(() => {
    fetchHistoriales();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? <p>Cargando historiales...</p> : <HistoryList historiales={historiales} />}
    </div>
  );
};

export default Histories;