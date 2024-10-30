import React, { useState } from 'react';
import HistoryList from '../components/HistoryList';

const Histories = () => {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idVeterinario, setIdVeterinario] = useState('');  // Estado para el ID ingresado por el usuario

  const fetchHistoriales = async () => {
    setLoading(true);
    try {

      if (!idVeterinario) {
        const response = await fetch('http://127.0.0.1:8000/check-table/?tabla=Historial');
        const data = await response.json();
        if (response.ok) {
          setHistoriales(data.data);
        } else {
          console.error('Error fetching historiales:', data.message);
        }
      }

      else {


      const response = await fetch(`http://127.0.0.1:8000/citas-veterinario/${idVeterinario}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setHistoriales(data.data);
      } else {
        console.error('Error fetching historiales:', data.message);
      } }
    
    
    
    
    } catch (error) {
      console.error('Error fetching historiales:', error);
    }
    setLoading(false);
  };

  const handleKeyPress = (event) => { // Función para buscar historiales al presionar Enter
    if (event.key === 'Enter') {
      fetchHistoriales();
    }
  };


 

  return (
    <div className="container mt-auto mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Ingrese el ID del veterinario"
          value={idVeterinario}
          onChange={(e) => setIdVeterinario(e.target.value)}
          className="border p-2 rounded mr-2"
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchHistoriales} className="bg-blue-500 text-white p-2 rounded">
          Buscar Historiales
        </button>
      </div>
      
      {loading ? (
        <p>Cargando historiales...</p>
      ) : (
        <HistoryList historiales={historiales} />
      )}
    </div>
  );
};

export default Histories;
