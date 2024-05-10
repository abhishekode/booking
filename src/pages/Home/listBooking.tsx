import React from 'react'
import { ListBookingProps } from 'Interfaces/booking';
import SingleBooking from './singleBooking';

const ListBooking: React.FC<ListBookingProps> = ({ bookingData }) => {

    const columns = ['Full Name', 'Email', 'Deck', 'Seat Number', 'Date of Booking', 'Actions'];

    return (
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
                    bookingData.map((booking, index: number) => <SingleBooking booking={booking} key={index} bookingIndex={index} />)
                }
            </tbody>
        </table>
    )
};


export default ListBooking;