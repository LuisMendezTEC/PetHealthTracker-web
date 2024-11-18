import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const {t} = useTranslation();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [puesto, setPuesto] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Mostrar carga

    try {
      console.log(process.env.REACT_APP_API_BASE_URL);
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña, role: 'funcionario' }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setToken(data.access_token);
        navigate('/');
      } else {
        setError('Error al iniciar sesión: ' + (data.detail || 'Datos incorrectos'));
      }
    } catch (error) {
      setError('Error de red: ' + error.message);
    } finally {
      setIsLoading(false); // Ocultar carga
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Mostrar carga

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
    } finally {
      setIsLoading(false); // Ocultar carga
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg bg-opacity-90">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <img
              src="/Animation.gif" // Reemplaza con tu imagen o animación de perrito
              alt="Cargando..."
              className="w-1000 h-1000 mb-4" 
            />
            <p className="text-gray-700">{t('login.loading')}</p>
          </div>
        ) : (
          <>
            {/* Encabezado */}
            <div>
              <h1 className="text-3xl font-bold text-center text-gray-800">
                {isRegistering ? 'Registrarse' : 'Bienvenido'}
              </h1>
              <p className="text-center text-gray-600 mt-2">
                {isRegistering ? 'Crea tu cuenta' : 'Ingresa a tu cuenta'}
              </p>
            </div>
  
            {/* Formularios */}
            {isRegistering ? (
              <form onSubmit={handleSubmitRegister} className="space-y-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    {t('login.name_label')}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="puesto" className="block text-sm font-medium text-gray-700">
                    {t('login.role_label')}
                  </label>
                  <select
                    id="puesto"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={puesto}
                    onChange={(e) => setPuesto(e.target.value)}
                    required
                  >
                    <option value="">{t('login.select_role')}</option>
                    <option value="Veterinario">{t('login.veterinarian_role')}</option>
                    <option value="Recepcionista">{t('login.receptionist_role')}</option>
                  </select>
                </div>
  
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    {t('login.email_label')}
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
                    {t('login.password_label')}
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                </div>
  
                {error && <p className="text-red-500 text-sm">{error}</p>}
  
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {t('login.registering')}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmitLogin} className="space-y-4">
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    {t('login.email_label')}
                  </label>
                  <input
                    type="email"
                    id="correo"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
                    {t('login.password_label')}
                  </label>
                  <input
                    type="password"
                    id="contraseña"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                </div>
  
                {error && <p className="text-red-500 text-sm">{error}</p>}
  
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {t('login.login_button')}
                </button>
              </form>
            )}
  
            {/* Pie de página */}
            <div className="text-center mt-4">
              <button
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isRegistering
                  ? t('login.already_have_account')
                  : t('login.no_account')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;