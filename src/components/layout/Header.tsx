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
        <nav className="flex flex-wrap items-center text-base justify-center">
          <p className="hover:text-gray-900">
            <Link to={'/booking-new'}>Booking New</Link>
          </p>
        </nav>
      </div>
    </header>
  )
}

export default Header