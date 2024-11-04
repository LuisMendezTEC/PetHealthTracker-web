import React, { useState } from 'react';
import { FaHeadset } from 'react-icons/fa';

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hola 👋 ¿en qué podemos ayudarte?", sender: "support" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      // Simulated auto-response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: "Gracias por tu mensaje, un miembro de nuestro equipo de desarrolladores te asistirá en breve.", sender: "support" }
        ]);
      }, 1000);
    }
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
        <div className="fixed bottom-24 right-4 md:right-8 w-96 max-w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out">
          <div className="bg-blue-600 text-white p-3 text-center font-semibold rounded-t-lg">
            Soporte Técnico
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 text-sm ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Escribe un mensaje..."
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