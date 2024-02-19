
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { IBooking, BookingUpdateData, BookingContextType } from 'Interfaces/booking';


const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
    children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [bookingItems, setBookingItems] = useState<IBooking[]>([]);
    const storageKey = 'bookings';

    const bookingItemFromLocalStorage = JSON.parse(localStorage.getItem(storageKey) || '[]')

    useEffect(() => setBookingItems(bookingItemFromLocalStorage.length  ? bookingItemFromLocalStorage : []), []);

    useEffect(() => localStorage.setItem(storageKey, JSON.stringify(bookingItems)), [bookingItems]);

    const updateBookingItem = (index: number, updatedData: BookingUpdateData) => {
        const previousData = JSON.parse(JSON.stringify(bookingItems));
        previousData[index] = updatedData;
        setBookingItems(previousData);
    };

    const removeBookingItem = (index: number) => {
        const updatedBooking = [...bookingItems];
        updatedBooking.splice(index, 1)
        setBookingItems(updatedBooking);
    };

    const addNewBooking = (product: IBooking) => {        
        setBookingItems((prevBookingItems) => {
            const itemIndex = prevBookingItems.findIndex((item) => item.dateOfBooking === product.dateOfBooking && item.seatNumber === product.seatNumber);

            if (itemIndex !== -1) {
                toast.error(`This ${product.seatNumber} is already booked on the same date: ${product.dateOfBooking}`);
            } else {
                prevBookingItems.push({ ...product });
            }
            return [...prevBookingItems];
        });
    };

    return (
        <BookingContext.Provider
            value={{
                bookingItems,
                addNewBooking,
                updateBookingItem,
                removeBookingItem,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
};