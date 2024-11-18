import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';
import useDecodedToken from '../hooks/UseDecodedToken';

const Navbar = () => {
  const decodedToken = useDecodedToken();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const changeLanguage = (lng) => {
    console.log("Language: ", lng);
    console.log(lng);
    i18n.changeLanguage(lng);
  };

  const navigationLinks = [
    { name: t('nav.clients'), path: '/' },
    { name: t('nav.appointments'), path: '/citas' },
    { name: t('nav.records'), path: '/historiales' },
    ...(decodedToken?.role === 'Administrador'
      ? [{ name: t('nav.dashboard'), path: '/dashboard' }]
      : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-blue-600 dark:text-white text-lg font-bold">
              {t('nav.brand', { defaultValue: 'VetCare' })}
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

          {/* Language and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <option value="es">{t('nav.es')}</option>
              <option value="en">{t('nav.en')}</option>
            </select>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition-colors duration-300 ease-in-out"></div>
              <div
                className={`absolute left-0 w-5 h-5 bg-white border rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                }`}
              ></div>
            </label>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {decodedToken?.nombre || t('nav.user')}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
