import React, { useState, useEffect } from 'react';
import ClientList from '../components/ClientList';

const Clients = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    const response = await fetch('http://127.0.0.1:8000/check-table/?tabla=Clientes');
    const data = await response.json();
    if (response.ok) {
      setUsuarios(data.data);
    } else {
      console.error('Error fetching usuarios:', data.message);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto">
      {loading ? <p>Cargando clientes...</p> : <ClientList usuarios={usuarios} />}
    </div>
  );
};

export default Clients;