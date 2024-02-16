import React from 'react'
import { useBooking } from 'context/bookingContext'
import { Link, useParams } from 'react-router-dom'

const BookingConfirm = () => {
    const params = useParams()
    const { bookingItems } = useBooking()

    const seatNumber = params['seatNumber'];
    const bookingDetail = bookingItems.find(item => item.seatNumber === seatNumber)

    return (
        <div>
            {bookingDetail ?
                (<section className="text-gray-600 body-font">
                    <div className="container mx-auto flex px-5 py-3 items-center justify-center flex-col">
                        <div className="text-center lg:w-2/3 w-full shadow-lg lg:py-16 py-10 rounded-md border">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 capitalize">{`hello ${bookingDetail?.firstName} ${bookingDetail?.lastName}`}</h1>
                            <p className="leading-relaxed">You have booked successfully ticket on <span className='font-semibold'>{bookingDetail?.dateOfBooking}</span> </p>
                            <p className="leading-relaxed">Your Seat Number <span className='font-semibold'>{bookingDetail?.seatNumber.substring(5)}</span></p>
                            <p className="mb-8 leading-relaxed">Your Bus Deck level is <span className='font-semibold'>{bookingDetail?.deck}</span> </p>
                            <div className="flex justify-center">
                                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                    <Link to='/'>Dashboard</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>)
                : (<div className="container mx-auto flex px-5 py-3 items-center justify-center flex-col">
                    <p>No Data found</p>
                    <div className="flex justify-center">
                        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            <Link to='/'>Dashboard</Link>
                        </button>
                    </div>
                </div>
                )}
        </div>
    )
}

export default BookingConfirm