import React, { useState, useEffect } from 'react';
import ClientList from '../components/ClientList';

const Clients = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mascotasLista, setMascotasLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const [usuariosRes, mascotasRes] = await Promise.all([
        fetch('http://127.0.0.1:8000/check-table/?tabla=Clientes'),
        fetch('http://127.0.0.1:8000/check-table/?tabla=Mascotas')
      ]);

      if (!usuariosRes.ok) throw new Error('Error al cargar los clientes');
      if (!mascotasRes.ok) throw new Error('Error al cargar las mascotas');

      const usuarioData = await usuariosRes.json();
      const mascotaData = await mascotasRes.json();

      setUsuarios(usuarioData.data || []);
      setMascotasLista(mascotaData.data || []);

      if (usuarioData.data.length === 0) setError('No se encontraron clientes');
      if (mascotaData.data.length === 0 && usuarioData.data.length > 0) setError('No se encontraron mascotas asociadas a los clientes');

    } catch (error) {
      setError(error.message || 'Error de conexión al servidor');
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Clientes</h1>
        <p className="text-gray-600">Consulta y gestiona la lista de clientes registrados</p>
      </div>

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
              <span className="ml-2 text-gray-600">Cargando datos...</span>
            </div>
          ) : (
            usuarios.length > 0 && mascotasLista.length > 0 ? (
              <ClientList usuarios={usuarios} mascotas={mascotasLista} />
            ) : !error && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay datos para mostrar</p>
                <p className="text-sm text-gray-400 mt-1">Realiza una acción para ver los resultados</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
