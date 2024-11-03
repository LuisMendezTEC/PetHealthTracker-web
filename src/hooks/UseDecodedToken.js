import { useState, useEffect } from 'react';

const useDecodedToken = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1]; // El payload es la segunda parte del token
        const decodedPayload = JSON.parse(atob(payloadBase64)); // Decodifica de Base64 y convierte a JSON
        setDecodedToken(decodedPayload);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setDecodedToken(null);
      }
    }
  }, []);

  return decodedToken;
};

export default useDecodedToken;
