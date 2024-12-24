import React, { useState } from 'react';
import logo from '../../Assets/logo.png';
import './sidebar.css';

function Sidebar() {
    // Initialize with 'students' selected
    const [selectedMenuItem, setSelectedMenuItem] = useState('students');
    const [darkMode, setDarkMode] = useState(false);

    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

    const images = importAll(require.context('../../Assets/sbIcons/', false, /\.(png|jpe?g|svg)$/));

    const handleClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className='bg-white dark:bg-gray-800 p-4 md:p-6 flex flex-col h-full'>
            <div className='flex-grow'>
                <img className='h-auto mx-auto md:mx-0' style={{ width: '98px' }} src={logo} alt='quyl logo'></img>
                <ul className="space-y-2 mt-4">
                    <li className={`menu-item flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${selectedMenuItem === 'dashboard' ? 'selected' : ''}`} 
                        onClick={() => handleClick('dashboard')}>
                        <img src={images['sbDashboard.png']} alt='dashboard icon'></img> Dashboard
                    </li>
                    <li className="menu-item flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded selected">
                        <img src={images['sbStudents.png']} alt='student icon'></img> Students
                    </li>
                    <li className={`menu-item flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${selectedMenuItem === 'help' ? 'selected' : ''}`} 
                        onClick={() => handleClick('help')}>
                        <img src={images['sbHelp.png']} alt='help icon'></img> Help
                    </li>
                    <li className={`menu-item flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${selectedMenuItem === 'reports' ? 'selected' : ''}`} 
                        onClick={() => handleClick('reports')}>
                        <img src={images['sbReport.png']} alt='reports icon'></img> Reports
                    </li>
                    <li className={`menu-item flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded ${selectedMenuItem === 'settings' ? 'selected' : ''}`} 
                        onClick={() => handleClick('settings')}>
                        <img src={images['sbSetting.png']} alt='setting icon'></img> Settings
                    </li>
                </ul>
            </div>
            <button
                onClick={toggleDarkMode}
                className="mt-auto flex items-center gap-2 w-full p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
            >
                {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}

export default Sidebar;