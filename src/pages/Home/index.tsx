import React from 'react'
import { Link } from 'react-router-dom';
import { useBooking } from 'context/bookingContext';

import ListBooking from './listBooking';


const Home = () => {
  const { bookingItems } = useBooking()
  return (
    <div>
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap items-center text-base font-bold justify-end">
          <p className="border px-4 py-2 rounded-md bg-black text-white">
            <Link to={'/booking-new'}>New Ticket Booking</Link>
          </p>
        </div>
        <div className="mt-5 border overflow-x-scroll rounded-md">
          {bookingItems.length > 0 ?
            <ListBooking bookingData={bookingItems} />
            : (<div>
              <p className='py-5 text-center'>No booking found</p>
            </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default Home