import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    const response = await fetch('http://127.0.0.1:8000/check-table/?tabla=Clientes');
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setUsuarios(data.data);
    } else {
      console.error('Error fetching usuarios:', data.message);
    }
  };

  fetchUsuarios();
}

export default App;
