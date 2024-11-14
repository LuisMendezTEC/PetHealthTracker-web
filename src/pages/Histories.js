import React, { useState, useEffect, useCallback } from 'react';
import HistoryList from '../components/HistoryList';
import useDecodedToken from '../hooks/UseDecodedToken.js'; 

const Histories = () => {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const decodedToken = useDecodedToken();
  const idVeterinario = decodedToken?.id;

  const fetchHistoriales = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const url = `http://127.0.0.1:8000/citas-veterinario/${idVeterinario}`;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      };

      const response = await fetch(url, { headers });
      const data = await response.json();

      if (response.ok) {
        setHistoriales(data.data);
        if (data.data.length === 0) {
          setError('No se encontraron historiales para este veterinario');
        }
      } else {
        setError(data.message || 'Error al cargar los historiales');
        setHistoriales([]);
      }
    } catch (error) {
      setError('Error de conexión al servidor');
      console.error('Error fetching historiales:', error);
      setHistoriales([]);
    }
    setLoading(false);
  }, [idVeterinario]);

  useEffect(() => {
    if (idVeterinario) {
      fetchHistoriales();
    }
  }, [idVeterinario, fetchHistoriales]); 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Historiales Clínicos</h1>
        <p className="text-gray-600 dark:text-gray-300">Consulta los historiales clínicos asociados a tu cuenta</p>
      </div>

      {/* Results Section */}
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
              <span className="ml-2 text-gray-600 dark:text-gray-300">Cargando historiales...</span>
            </div>
          ) : (
            historiales.length > 0 ? (
              <HistoryList historiales={historiales} />
            ) : !error && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No hay historiales para mostrar</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Los historiales asociados a tu cuenta aparecerán aquí</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Histories;