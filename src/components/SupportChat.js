import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHeadset } from 'react-icons/fa';

const SupportChat = () => {
  const {t} = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: t('supportChat.text'), sender: "support" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  const responseOptions = {
    citas: t('supportChat.citas'),
    historiales: t('supportChat.historiales'),
    modoOscuro: t('supportChat.modoOscuro'),
    problemas: t('supportChat.problemas'),
    general: t('supportChat.general')
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
    setMessages([{ text: t('supportChat.text'), sender: "support" }]);
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
            {t('supportChat.technical_support')}
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
                  onClick={() => handleSuggestionClick(t('supportChat.gestionar_cita'), "citas")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  {t('supportChat.manage_appointments')}
                </button>
                <button
                  onClick={() => handleSuggestionClick(t('supportChat.ver_historiales'), "historiales")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  {t('supportChat.view_medical_records')}
                </button>
                <button
                  onClick={() => handleSuggestionClick(t('supportChat.activar_modo_oscuro'), "modoOscuro")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  {t('supportChat.enable_dark_mode')}
                </button>
                <button
                  onClick={() => handleSuggestionClick(t('supportChat.problemas_tecnicos'), "problemas")}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  {t('supportChat.technical_problem')}
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
                  {t('supportChat.another_query')}
                </button>
                <button
                  onClick={resetChat}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  {t('supportChat.end_chat')}
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
              placeholder={t('supportChat.describe_issue')}
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              style={{ minWidth: "72px" }}
            >
             {t('supportChat.send')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportChat;