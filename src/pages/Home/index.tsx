import React from 'react'
import { useBooking } from 'context/bookingContext';
import SingleBooking from './SingleBooking';
import { Link } from 'react-router-dom';


const Home = () => {
  const { bookingItems } = useBooking()
  const columns = ['Full Name', 'Email', 'Deck', 'Seat Number', 'Date of Booking', 'Actions'];
  return (
    <div>
      <div className="container mx-auto px-2">
        <nav className="flex flex-wrap items-center text-base font-bold justify-end">
          <p className="hover:text-gray-900  border px-4 py-2 rounded-md">
            <Link to={'/booking-new'}>Booking New Ticket</Link>
          </p>
        </nav>
        <div className="mt-12 border overflow-x-scroll rounded-md">
          {bookingItems.length > 0 ?
            <table className="w-full table-auto text-sm text-left border">
              <thead className="bg-gray-50 text-gray-700 font-bold border-b text-base">
                <tr>
                  {columns.map((col) => (
                    <th scope="col" className="px-6 py-3" key={col}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {
                  bookingItems.map((booking, index:number) => (
                    <SingleBooking booking={booking} key={index} bookingIndex={index} />
                  ))}
              </tbody>
            </table>
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