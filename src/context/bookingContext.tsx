
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { IBooking, BookingUpdateData } from 'Interfaces/booking';

interface BookingContextType {
    bookingItems: IBooking[];
    addNewBooking: (product: IBooking) => void;
    updateBookingItem: (seatNumber: string, updatedData: BookingUpdateData) => void;
    removeBookingItem: (seatNumber: string) => void;
    clearAllBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

interface BookingProviderProps {
    children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
    const [bookingItems, setBookingItems] = useState<IBooking[]>([]);
    const storageKey = 'bookings';

    useEffect(() => {
        const storedBookingItems = JSON.parse(localStorage.getItem(storageKey) || '[]') as IBooking[];
        setBookingItems(storedBookingItems);
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(bookingItems));
    }, [bookingItems]);

    const updateBookingItem = (seatNumber: string, updatedData: BookingUpdateData) => {
        // Find the item in the cart and update its quantity
        const updatedCart = bookingItems.map(item => {
            if (item.seatNumber === seatNumber) {
                return { ...item, ...updatedData };
            }
            return item;
        });

        setBookingItems(updatedCart);
    };

    const removeBookingItem = (seatNumber: string) => {
        // Filter out the item to remove it from the cart
        const updatedCart = bookingItems.filter(item => item.seatNumber !== seatNumber);
        setBookingItems(updatedCart);
    };

    const addNewBooking = (product: IBooking) => {
        setBookingItems((prevBookingItems) => {
            const itemIndex = prevBookingItems.findIndex((item) => item.seatNumber === product.seatNumber);

            if (itemIndex !== -1) {
                toast.error(`This ${product.seatNumber} is already booked`)
            } else {
                prevBookingItems.push({ ...product });
            }
            return [...prevBookingItems];
        });
    };



    const clearAllBooking = () => {
        setBookingItems([]);
    };

    return (
        <BookingContext.Provider
            value={{
                bookingItems,
                addNewBooking,
                updateBookingItem,
                removeBookingItem,
                clearAllBooking,
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