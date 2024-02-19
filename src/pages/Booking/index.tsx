import React from 'react';
import BookingTab from './bookingTab';
import { GiSteeringWheel } from 'react-icons/gi'
import BookingForm from './bookingForm';
import { useBooking } from 'context/bookingContext';
import { toast } from 'react-toastify';
import { generateSeatNumber } from 'utils/seat';


const Booking = () => {
  const [selectedSeat, setSelectedSeat] = React.useState<string | null>(null);
  const [isForBooking, setIsForBooking] = React.useState<boolean>(false);
  const [bookingDate, setBookingDate] = React.useState<string>()

  const { bookingItems } = useBooking();

  const bookedSeats = bookingItems.filter((item) => item.dateOfBooking === bookingDate).map((item) => item.seatNumber) || [];

  const lowerDeckSeatNumbers = generateSeatNumber('lower', 4, 5);
  const upperDeckSeatNumbers = generateSeatNumber('upper', 4, 5);

  const handleClick = (seatNumber: string) => {
    if (!bookingDate) {
      toast.warn('Please select a booking date first')
      return;
    }
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
    if (seatNumber !== selectedSeat) {
      setIsForBooking(true);
    }
  };

  const toggleModal = () => {
    setIsForBooking(!isForBooking)
  }

  return (
    <div>
      {isForBooking && <BookingForm isOpen={isForBooking} toggleModel={toggleModal} heading={selectedSeat} bookingDate={bookingDate} />}
      <div className="max-w-2xl mx-auto p-6">
        <div className="py-8 shadow-lg px-4 mb-8">
          <h2 className={`text-lg font-semibold mb-2 'text-gray-800'`}>Select Booking Date</h2>
          <input
            type="date"
            name="bookingDate"
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setBookingDate(e.target.value)}
            className='block w-full bg-gray input-color-gray input-color-gray font-roboto-100 rounded-md sm:text-sm p-3 bg-gray pr-4 border-2'
          />
        </div>
        {bookingDate && <div className="">
          <div className="mb-16">
            <h2 className="text-lg font-semibold mb-2">Lower Deck</h2>
            <p className="text-sm mb-4">Click on an available seat to proceed with your transaction.</p>
            <div className="flex w-full gap-2">
              <div className="flex gap-2 flex-col">
                <button className="bg-gray-200 h-36 max-w-12 px-2 py-3" disabled><GiSteeringWheel /></button>
              </div>
              <div className="grid grid-cols-5 gap-4 w-full">
                {lowerDeckSeatNumbers?.map(seat => (
                  <BookingTab
                    key={seat}
                    selectedSeat={selectedSeat}
                    onClickBook={handleClick}
                    seat={seat}
                    bookedSeats={bookedSeats}
                  />
                ))}
              </div>

            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Upper Deck</h2>
            <p className="text-sm mb-4">Click on an available seat to proceed with your transaction.</p>
            <div className="flex w-full gap-2">
              <div className="grid grid-cols-5 gap-4 w-full">
                {upperDeckSeatNumbers?.map(seat => (
                  <BookingTab
                    key={seat}
                    selectedSeat={selectedSeat}
                    onClickBook={handleClick}
                    seat={seat}
                    bookedSeats={bookedSeats}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Booking;
