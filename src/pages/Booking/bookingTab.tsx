import { BookingTabProps } from 'Interfaces/booking'
import React from 'react'


const BookingTab: React.FC<BookingTabProps> = ({ seat, bookedSeats, selectedSeat, onClickBook }) =>
    <button
        key={seat}
        disabled={bookedSeats.includes(seat)}
        className={`
            ${bookedSeats.includes(seat) ? 'bg-red-600 text-gray-50' : 'bg-gray-200'} 
            ${selectedSeat === seat ? 'bg-gray-900 text-gray-50' : 'bg-gray-200'} 
            px-2 py-3`}
        onClick={() => onClickBook(seat)}
    >
        {seat.substring(5)}
    </button>


export default BookingTab