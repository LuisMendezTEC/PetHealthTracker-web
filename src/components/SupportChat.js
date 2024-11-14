import React, { useState } from 'react';
import { FaHeadset } from 'react-icons/fa';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hola 👋 ¿Cómo te podemos ayudar hoy? Selecciona una opción o escribe tu consulta:", sender: "support" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const responseOptions = {
    citas: "¿Tienes problemas para gestionar tus citas? Puedes ir a la sección de 'Citas' en el menú principal. Déjame saber si necesitas una guía más detallada.",
    historiales: "Para acceder a los historiales de pacientes, ve a 'Historiales' desde el menú. ¿Hay algo específico con lo que necesitas ayuda en esta sección?",
    modoOscuro: "Para cambiar el tema de la aplicación a modo oscuro, utiliza el interruptor de tema en la esquina superior. ¿Te gustaría asistencia adicional con la personalización?",
    problemas: "Lamentamos que estés experimentando problemas. Por favor, describe el problema o el error y un desarrollador te ayudará a resolverlo lo antes posible.",
    general: "Gracias por tu mensaje. Un miembro de nuestro equipo de soporte técnico te asistirá en breve."
  };

  const getAutoResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    if (/cita|appointment/.test(lowerMessage)) return responseOptions.citas;
    if (/historial|history/.test(lowerMessage)) return responseOptions.historiales;
    if (/modo oscuro|tema oscuro/.test(lowerMessage)) return responseOptions.modoOscuro;
    if (/problema|error/.test(lowerMessage)) return responseOptions.problemas;
    return responseOptions.general;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      const response = getAutoResponse(newMessage);
      setNewMessage("");
      setShowSuggestions(false);

      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: response, sender: "support" }
        ]);
        setTimeout(() => setShowOptions(true), 500);
      }, 1000);
    }
  };

  const handleSuggestionClick = (text, responseKey) => {
    setMessages([...messages, { text, sender: "user" }]);
    setShowSuggestions(false);

    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: responseOptions[responseKey], sender: "support" }
      ]);
      setTimeout(() => setShowOptions(true), 500);
    }, 1000);
  };

  const resetChat = () => {
    setMessages([{ text: "Hola 👋 ¿Cómo te podemos ayudar hoy? Selecciona una opción o escribe tu consulta:", sender: "support" }]);
    setShowSuggestions(true);
    setShowOptions(false);
    setNewMessage("");
    setIsOpen(false);
  };

  const newQuery = () => {
    setShowSuggestions(true);
    setShowOptions(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-blue-700 transition duration-200"
      >
        <FaHeadset size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 w-96 max-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out">
          <div className="bg-blue-600 text-white p-3 text-center font-semibold rounded-t-lg">
            Soporte Técnico para Veterinarios
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 text-sm ${msg.sender === "user" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Sugerencias al inicio */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => handleSuggestionClick("¿Cómo gestionar mis citas?", "citas")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Gestión de citas
                </button>
                <button
                  onClick={() => handleSuggestionClick("¿Cómo ver los historiales médicos?", "historiales")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Ver historiales médicos
                </button>
                <button
                  onClick={() => handleSuggestionClick("¿Cómo activar el modo oscuro?", "modoOscuro")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Activar modo oscuro
                </button>
                <button
                  onClick={() => handleSuggestionClick("Tengo un problema técnico", "problemas")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Problema técnico
                </button>
              </div>
            )}

            {/* Opciones después de enviar un mensaje */}
            {showOptions && (
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={newQuery}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Realizar otra consulta
                </button>
                <button
                  onClick={resetChat}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Terminar chat
                </button>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:text-white"
              placeholder="Describe tu problema o consulta..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              style={{ minWidth: "72px" }}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;