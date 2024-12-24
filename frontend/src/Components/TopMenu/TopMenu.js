import React, { useState } from 'react';
import logo from '../../Assets/logo.png';

function TopMenu() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'sbDashboard.png' },
    { id: 'students', label: 'Students', icon: 'sbStudents.png' },
    { id: 'help', label: 'Help', icon: 'sbHelp.png' },
    { id: 'reports', label: 'Reports', icon: 'sbReport.png' },
    { id: 'settings', label: 'Settings', icon: 'sbSetting.png' },
  ];

  const handleClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex bg-white dark:bg-gray-800 px-4 py-2 shadow-md dark:shadow-gray-900 space-x-4 items-center justify-between">
      <div className="flex items-center space-x-4">
        <img className="h-8" src={logo} alt="Logo" />
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center gap-2 p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white rounded ${
              selectedMenuItem === item.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
            onClick={() => handleClick(item.id)}
          >
            <img 
              src={require(`../../Assets/sbIcons/${item.icon}`)} 
              alt={`${item.label} icon`}
              className="dark:opacity-80" 
            />
          </button>
        ))}
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default TopMenu;
