
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { IBooking, BookingUpdateData } from 'Interfaces/booking';

interface BookingContextType {
    bookingItems: IBooking[];
    addNewBooking: (product: IBooking) => void;
    updateBookingItem: (index: number, updatedData: BookingUpdateData) => void;
    removeBookingItem: (index: number) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
    children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [bookingItems, setBookingItems] = useState<IBooking[]>([]);
    const storageKey = 'bookings';

    const bookingItemFromLocalStorage = JSON.parse(localStorage.getItem(storageKey) || '[]')
    useEffect(() => {
        if (bookingItemFromLocalStorage.length > 0) {

            setBookingItems(bookingItemFromLocalStorage);
        } else {
            setBookingItems([])
        }
    }, []);

    useEffect(() => {
        if(bookingItems.length > 0){
            localStorage.setItem(storageKey, JSON.stringify(bookingItems));
        }
    }, [bookingItems]);

    const updateBookingItem = (index: number, updatedData: BookingUpdateData) => {
        const updatedCart = bookingItems.map((item, idx) => {
            if (idx === index) {
                return { ...item, ...updatedData };
            }
            return item;
        });

        setBookingItems(updatedCart);
    };

    const removeBookingItem = (index: number) => {
        const updatedCart = bookingItems.filter((item, idx) => idx !== index);
        setBookingItems(updatedCart);
    };

    const addNewBooking = (product: IBooking) => {
        setBookingItems((prevBookingItems) => {
            const itemIndex = prevBookingItems.findIndex((item) => item.dateOfBooking === product.dateOfBooking && item.seatNumber === product.seatNumber);

            if (itemIndex !== -1) {
                toast.error(`This ${product.seatNumber} is already booked`)
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