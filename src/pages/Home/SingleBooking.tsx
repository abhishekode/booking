import { IBooking } from 'Interfaces/booking'
import SureDeleteBooking from 'components/alert/SureDeleteBooking';
import BookingForm from 'pages/Booking/BookingForm';
import React, { useState } from 'react'

interface SingleBookingProps {
    booking: IBooking;
    bookingIndex: number;
}
const SingleBooking: React.FC<SingleBookingProps> = ({ booking, bookingIndex }) => {
    const [editBooking, setEditBooking] = useState<boolean>(false)
    const [deleteBooking, setDeleteBooking] = useState<boolean>(false)

    const toggleModal = () => {
        setEditBooking(!editBooking)
    }

    const toggleDeleteModal = () => {
        setDeleteBooking(!deleteBooking)
    }

    return (
        <>
            {editBooking && (
                <BookingForm
                    isOpen={editBooking}
                    toggleModel={toggleModal}
                    heading={booking.seatNumber}
                    booking={booking}
                    bookingIndex={bookingIndex}
                />
            )}
            {deleteBooking && (
                <SureDeleteBooking
                    isOpen={deleteBooking}
                    toggleModel={toggleDeleteModal}
                    bookingIndex={bookingIndex}
                />
            )}
            <tr>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                    {`${booking.firstName} ${booking.lastName}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.deck}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.seatNumber.substring(5)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.dateOfBooking}</td>
                <td className="">
                    <button
                        className="py-2 px-3 font-medium text-orange-600 hover:text-orange-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={toggleModal}
                    >
                        Edit
                    </button>
                    <button
                        className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                        onClick={toggleDeleteModal}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default SingleBooking