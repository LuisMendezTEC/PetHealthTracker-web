import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  MdLanguage,
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdClose,
} from "react-icons/md";
import ThemeContext from "../context/ThemeContext";
import useDecodedToken from "../hooks/UseDecodedToken";

const Navbar = () => {
  const decodedToken = useDecodedToken();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const navigationLinks = [
    { name: t("nav.clients"), path: "/" },
    { name: t("nav.appointments"), path: "/citas" },
    { name: t("nav.records"), path: "/historiales" },
    ...(decodedToken?.role === "Administrador"
      ? [{ name: t("nav.dashboard"), path: "/dashboard" }]
      : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-blue-600 dark:text-white text-lg font-bold">
              {t("nav.brand", { defaultValue: "VetCare" })}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 border-b-2 border-transparent hover:border-blue-600 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>

          {/* Desktop Toggles */}
          <div className="hidden sm:flex items-center space-x-6">
            {/* Language Toggle */}
            <div className="flex items-center space-x-2">
              <MdLanguage className="text-gray-700 dark:text-gray-300 w-5 h-5" />
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={language === "en"}
                  onChange={toggleLanguage}
                  className="sr-only"
                />
                <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out"></div>
                <div
                  className={`absolute left-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                    language === "en" ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              {theme === "dark" ? (
                <MdDarkMode className="text-gray-700 dark:text-gray-300 w-5 h-5" />
              ) : (
                <MdLightMode className="text-gray-700 dark:text-gray-300 w-5 h-5" />
              )}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                  className="sr-only"
                />
                <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out"></div>
                <div
                  className={`absolute left-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                    theme === "dark" ? "translate-x-5" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {t("nav.logout")}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Toggles */}
            <div className="flex flex-col space-y-4 mt-4 px-3">
              {/* Language Toggle */}
              <div className="flex items-center space-x-2">
                <MdLanguage className="text-gray-700 dark:text-gray-300 w-5 h-5" />
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={language === "en"}
                    onChange={toggleLanguage}
                    className="sr-only"
                  />
                  <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out"></div>
                  <div
                    className={`absolute left-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                      language === "en" ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </label>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2">
                {theme === "dark" ? (
                  <MdDarkMode className="text-gray-700 dark:text-gray-300 w-5 h-5" />
                ) : (
                  <MdLightMode className="text-gray-700 dark:text-gray-300 w-5 h-5" />
                )}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={toggleTheme}
                    className="sr-only"
                  />
                  <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out"></div>
                  <div
                    className={`absolute left-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                      theme === "dark" ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </label>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                {t("nav.logout")}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
