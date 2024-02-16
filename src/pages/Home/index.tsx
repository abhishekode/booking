import React from 'react'
import { useBooking } from 'context/bookingContext';
import SingleBooking from './SingleBooking';


const Home = () => {
  const { bookingItems } = useBooking()
  const columns = ['Full Name', 'Deck', 'Email', 'Seat Number', 'Date of Booking', 'Actions'];
  return (
    <div>
      <div className="mt-12 border overflow-x-scroll">
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
              bookingItems.length > 0 ?
                (bookingItems.map((booking) => (
                  <SingleBooking booking={booking} key={booking.seatNumber} />
                ))) :
                (<tr>
                  <td className='py-5 text-center'>No booking found</td>
                </tr>
                )
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Home