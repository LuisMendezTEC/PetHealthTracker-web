import React, { useState, useEffect } from 'react';

const HistoryList = ({ historiales }) => {
  const [mascotas, setMascotas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHistorial, setSelectedHistorial] = useState(null); // Para controlar qué historial está expandido

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mascotasRes, clientesRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/check-table/?tabla=Mascotas'),
          fetch('http://127.0.0.1:8000/check-table/?tabla=Clientes')
        ]);

        if (!mascotasRes.ok || !clientesRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const mascotasData = await mascotasRes.json();
        const clientesData = await clientesRes.json();

        setMascotas(mascotasData.data || []);
        setClientes(clientesData.data || []);
      } catch (err) {
        setError(err.message || 'Error de conexión al servidor');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCardClick = (id) => {
    setSelectedHistorial(selectedHistorial === id ? null : id);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historiales de Mascotas</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {historiales.map((historial) => {
            const mascota = mascotas.find(m => m.id === historial.id_mascota);
            const cliente = clientes.find(c => c.id === (mascota ? mascota.id_dueño : null));

            return (
              <div
                key={historial.id}
                onClick={() => handleCardClick(historial.id)}
                className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer transition transform hover:scale-105 ${selectedHistorial === historial.id ? 'border-blue-500 border-2' : ''}`}
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {mascota ? mascota.nombre_mascota : 'Mascota desconocida'}
                </h3>
                {cliente && (
                  <p className="text-gray-500 text-sm mt-1">
                    <span className="font-semibold">Dueño:</span> {cliente.nombre_usuario}
                  </p>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  <span className="font-semibold">Fecha:</span> {new Date(historial.fecha).toLocaleDateString()}
                </p>

                {/* Detalles adicionales visibles solo cuando se hace clic */}
                {selectedHistorial === historial.id && (
                  <div className="mt-4">
                    {mascota && (
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold">Raza:</span> {mascota.raza}
                      </p>
                    )}
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Tipo:</span> {historial.tipo}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Descripción:</span> {historial.descripcion}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <span className="font-semibold">Resultado:</span> {historial.resultado}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
