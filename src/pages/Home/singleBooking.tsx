import { SingleBookingProps } from 'Interfaces/booking'
import SureDeleteBooking from 'components/alert/sureDeleteBooking';
import BookingForm from 'pages/Booking/bookingForm';
import React, { useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md';

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
                <td className="flex gap-x-3 py-3 px-6 whitespace-nowrap capitalize">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleModal}
                    >
                        <MdModeEdit />
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={toggleDeleteModal}
                    >
                        <MdDelete />
                    </button>
                </td>
            </tr>
        </>
    )
}

export default SingleBooking