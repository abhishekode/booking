import React from 'react';
import BookingTab from './BookingTab';
import { GiSteeringWheel } from 'react-icons/gi'
import BookingForm from './BookingForm';
import { useBooking } from 'context/bookingContext';


const Booking = () => {
  const [selectedSeat, setSelectedSeat] = React.useState<string | null>(null);
  const [isForBooking, setIsForBooking] = React.useState<boolean>(false);
  const { bookingItems } = useBooking();

  const bookedSeats = bookingItems.length > 0 ? bookingItems.map((item) => item.seatNumber) : [];

  const lowerDeckSeatNumbers = [];
  for (let i = 1; i <= 4; i++) {
    for (let j = 65; j <= 69; j++) {
      lowerDeckSeatNumbers.push(`lower${i}${String.fromCharCode(j)}`);
    }
  }

  const upperDeckSeatNumbers = [];
  for (let i = 1; i <= 4; i++) {
    for (let j = 65; j <= 69; j++) {
      upperDeckSeatNumbers.push(`upper${i}${String.fromCharCode(j)}`);
    }
  }

  const handleClick = (seatNumber: string) => {
    setSelectedSeat(seatNumber === selectedSeat ? null : seatNumber);
    if (seatNumber !== selectedSeat) {
      setIsForBooking(true);
    }
  };

  const toggleModal = () => {
    setIsForBooking(!isForBooking)
  }

  console.log('bookedSeats', bookedSeats);

  return (
    <div>
      {isForBooking && <BookingForm isOpen={isForBooking} toggleModel={toggleModal} heading={selectedSeat} />}
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-16">
          <h2 className="text-lg font-semibold mb-2">Lower Deck</h2>
          <p className="text-sm mb-4">Click on an available seat to proceed with your transaction.</p>
          <div className="flex w-full gap-2">
            <div className="flex gap-2 flex-col">
              <button className="bg-gray-200 h-36 max-w-12 px-2 py-3" disabled><GiSteeringWheel /></button>
            </div>
            <div className="grid grid-cols-5 gap-4 w-full">
              {lowerDeckSeatNumbers.map(seat => (
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
              {upperDeckSeatNumbers.map(seat => (
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
      </div>
    </div>
  );
};

export default Booking;
