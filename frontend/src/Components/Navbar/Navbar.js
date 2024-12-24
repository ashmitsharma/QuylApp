import React from 'react'
import './navbar.css'
import profileImage from '../../Assets/Avatar Image.png';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/slices/studentSlice'

function Navbar() {
  const dispatch = useDispatch();

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
  }

  const icon_images = importAll(require.context('../../Assets/nbIcons/', false, /\.(png|jpe?g|svg)$/));

  return (
    <div className="flex flex-wrap items-center justify-between py-4 ">
      {/* Left Side: Search Bar */}
      <div className="w-full lg:w-3/5 relative lg:pr-12">
        <img
          src={icon_images['Search.png']}
          alt="Search Icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 w-4 h-4 dark:opacity-70"
        />
        <input
          type="text"
          placeholder="Search your course"
          className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm search-bar pl-10 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          onChange={(e) =>
            dispatch(setFilter({ filterName: 'search', filterValue: e.target.value }))
          }
        />
      </div>

      {/* Right Side: Icons and Profile */}
      <div className="w-full lg:w-2/5 flex items-center gap-10 justify-center">
        {/* Icons */}

        <img className="cursor-pointer dark:opacity-70 hover:opacity-100" src={icon_images['help.png']} alt='help icon'></img>
        <div className="relative inline-block">
          <img className="cursor-pointer icon-size dark:opacity-70 hover:opacity-100" src={icon_images['message.png']} alt="message icon" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </div>
        <img className="cursor-pointer dark:opacity-70 hover:opacity-100" src={icon_images['settings.png']} alt='setting icon'></img>
        <div className="relative inline-block">
          <img className="cursor-pointer icon-size dark:opacity-70 hover:opacity-100" src={icon_images['Notification.png']} alt='notification icon'></img>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="User Avatar"
            className="w-10 h-10 rounded-xl border border-gray-300 dark:border-gray-600"
          />
          <span className="name hidden md:block dark:text-gray-200">Adeline H. Dancy</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar