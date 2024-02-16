import { IBooking } from 'Interfaces/booking';
import CustomModal from 'components/common/Model';
import { useBooking } from 'context/bookingContext';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface BookingFormProps {
    isOpen: boolean;
    toggleModel: () => void;
    heading: string | null;
    booking?: IBooking;
    bookingDate?: string;
}
const BookingForm: React.FC<BookingFormProps> = ({ isOpen, toggleModel, heading, booking, bookingDate }) => {
    const { addNewBooking, bookingItems, updateBookingItem } = useBooking()
    const navigate = useNavigate()
    const seatNumber: 'upper' | 'lower' = heading as any;
    const deck = seatNumber.match(/^[a-zA-Z]+/)?.[0];

    const [state, setState] = useState<IBooking>({
        dateOfBooking: booking?.dateOfBooking || bookingDate || '',
        deck: booking?.deck || deck || '',
        firstName: booking?.firstName || '',
        lastName: booking?.lastName || '',
        email: booking?.email || '',
        seatNumber: booking?.seatNumber || seatNumber,
    })
    const [errors, setErrors] = useState<Record<keyof IBooking, string>>({
        dateOfBooking: '',
        deck: '',
        firstName: '',
        lastName: '',
        email: '',
        seatNumber: '',
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' });
        setState({ ...state, [name]: value });
    };

    const validateForm = (): boolean => {
        const newErrors: Record<keyof IBooking, string> = { ...errors };

        Object.entries(state).forEach(([key, value]) => {
            if (typeof value === 'string' && value.trim() === '') {
                newErrors[key as keyof IBooking] = `${key} cannot be empty`;
            }
        });

        setErrors(newErrors);
        return Object.values(newErrors).some(error => error.trim() !== '');
    };



    const handleNewBooking = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        const hasErrors = validateForm();
        if (hasErrors) {
            return;
        }
        const bookedSeats = bookingItems.find((item) => item.dateOfBooking === state.dateOfBooking && item.seatNumber === state.seatNumber);
        try {
            if (booking?.seatNumber) {
                updateBookingItem(booking.seatNumber, state)
            } else {

                if (bookedSeats) {
                    toast.error(`On ${state.dateOfBooking} this ${state.seatNumber} is already booked`)
                    return;
                }
                addNewBooking(state)
                navigate(`/booking/${state.seatNumber}`)
            }
            toggleModel()
        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        if (booking) {
            setState(booking);
        }
    }, []);
    return (
        <div>
            <CustomModal heading={heading || 'Heading'} isOpen={isOpen} toggleModal={toggleModel}>
                <form className="max-w-sm mx-auto text-gray-800 py-10" onSubmit={handleNewBooking}>
                    <div className="mb-5">
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium">Enter First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name='firstName'
                            className="border block w-full p-2.5"
                            placeholder="john"
                            autoComplete='none'
                            value={state.firstName}
                            onChange={handleInputChange}
                        />
                        {errors?.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium">Enter Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name='lastName'
                            className="border block w-full p-2.5"
                            placeholder="john"
                            autoComplete='none'
                            value={state.lastName}
                            onChange={handleInputChange}
                        />
                        {errors?.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                        <input
                            type="email"
                            id="email"
                            name='email'
                            className="border block w-full p-2.5"
                            value={state.email}
                            onChange={handleInputChange}
                        />
                        {errors?.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>

                    {!booking?.dateOfBooking && <div className="mb-5">
                        <label htmlFor="dateOfBooking" className="block mb-2 text-sm font-medium">Date Of Booking</label>
                        <input
                            type="date"
                            id="dateOfBooking"
                            name='dateOfBooking'
                            className="border block w-full p-2.5"
                            value={state.dateOfBooking}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={handleInputChange}
                        />
                        {errors?.dateOfBooking && <div className="text-red-500 text-sm">{errors.dateOfBooking}</div>}
                    </div>}

                    <button
                        type="submit"
                        className="bg-gray-900 px-8 py-3 text-gray-100 rounded w-full">Submit</button>
                </form>
            </CustomModal>
        </div>
    )
}

export default BookingForm