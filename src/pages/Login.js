import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [nombre, setNombre] = useState('');
  const [puesto, setPuesto] = useState('');

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correo, contraseña, role: 'funcionario' }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.access_token); 
      setToken(data.access_token);  // Actualizamos el token en App inmediatamente
      navigate('/'); 
    } else {
      setError('Error al iniciar sesión: ' + (data.detail || 'Datos incorrectos'));
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError('');

    const payload = { nombre, puesto, correo, contraseña };

    try {
      const response = await fetch('http://127.0.0.1:8000/funcionarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Funcionario registrado exitosamente. Ahora puedes iniciar sesión.');
        setIsRegistering(false);
      } else {
        setError(`Error al registrar: ${data.detail || 'Datos incorrectos'}`);
      }
    } catch (error) {
      setError('Error al registrar: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h1>

      {isRegistering ? (
        <form onSubmit={handleSubmitRegister} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block">Nombre</label>
            <input
              type="text"
              id="nombre"
              className="border p-2 w-full"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="puesto" className="block">Puesto</label>
            <input
              type="text"
              id="puesto"
              className="border p-2 w-full"
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="correo" className="block">Correo</label>
            <input
              type="email"
              id="correo"
              className="border p-2 w-full"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="contraseña" className="block">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              className="border p-2 w-full"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Registrarse
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmitLogin} className="space-y-4">
          <div>
            <label htmlFor="correo" className="block">Correo</label>
            <input
              type="email"
              id="correo"
              className="border p-2 w-full"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="contraseña" className="block">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              className="border p-2 w-full"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Iniciar Sesión
          </button>
        </form>
      )}

      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="text-blue-500 mt-4"
      >
        {isRegistering ? '¿Ya tienes cuenta? Iniciar Sesión' : '¿No tienes cuenta? Registrarse'}
      </button>
    </div>
  );
};

export default Login;
