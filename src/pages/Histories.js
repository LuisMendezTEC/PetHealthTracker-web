import React, { useState } from 'react';
import HistoryList from '../components/HistoryList';

const Histories = () => {
  const [historiales, setHistoriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [idVeterinario, setIdVeterinario] = useState('');
  const [error, setError] = useState('');

  const fetchHistoriales = async () => {
    setLoading(true);
    setError('');
    try {
      const url = idVeterinario 
        ? `http://127.0.0.1:8000/citas-veterinario/${idVeterinario}`
        : 'http://127.0.0.1:8000/check-table/?tabla=Historial';

      const headers = {
        'Content-Type': 'application/json',
        ...(idVeterinario && { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
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
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchHistoriales();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Historiales Clínicos</h1>
        <p className="text-gray-600">Consulta los historiales clínicos por veterinario o visualiza todos los registros</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="max-w-xl">
          <label htmlFor="veterinario-id" className="block text-sm font-medium text-gray-700 mb-2">
            ID del Veterinario
          </label>
          <div className="flex gap-4">
            <input
              id="veterinario-id"
              type="text"
              placeholder="Deja vacío para ver todos los historiales"
              value={idVeterinario}
              onChange={(e) => setIdVeterinario(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <button
              onClick={fetchHistoriales}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Buscando...
                </span>
              ) : (
                'Buscar Historiales'
              )}
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Ingresa el ID del veterinario para filtrar sus historiales específicos
          </p>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-lg shadow">
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Cargando historiales...</span>
            </div>
          ) : (
            historiales.length > 0 ? (
              <HistoryList historiales={historiales} />
            ) : !error && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay historiales para mostrar</p>
                <p className="text-sm text-gray-400 mt-1">Realiza una búsqueda para ver los resultados</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Histories;