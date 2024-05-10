import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="text-gray-600 body-font shadow-md">
      <div className="container mx-auto flex flex-wrap py-5 items-center justify-between px-2">
        <Link to='/'>
          <p className="flex title-font font-medium items-center text-gray-900">
            <span className="text-xl font-bold">Bus-booking</span>
          </p>
        </Link>
        <Link to='/code-editor'>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Code Editor
          </button>
        </Link>
      </div>
    </header>
  )
}

export default Header