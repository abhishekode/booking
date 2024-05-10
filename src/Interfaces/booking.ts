export interface IBooking {
  firstName: string;
  lastName: string;
  email: string;
  seatNumber: string;
  dateOfBooking: string;
  deck: string;
}
export type BookingUpdateData = Partial<Omit<IBooking, "seatNumber" | "deck">>;

export interface BookingContextType {
  bookingItems: IBooking[];
  addNewBooking: (product: IBooking) => void;
  updateBookingItem: (index: number, updatedData: BookingUpdateData) => void;
  removeBookingItem: (index: number) => void;
}

export interface SureDeleteBookingProps {
	isOpen: boolean;
	toggleModel: () => void;
	bookingIndex: number;
}

export interface SingleBookingProps {
  booking: IBooking;
  bookingIndex: number;
}

export interface BookingTabProps {
  seat: string;
  bookedSeats: string[];
  selectedSeat: string | null;
  onClickBook: (arg: string) => void;
}


export interface BookingFormProps {
  isOpen: boolean;
  toggleModel: () => void;
  heading: string | null;
  booking?: IBooking;
  bookingDate?: string;
  bookingIndex?: number;
}

export interface ListBookingProps {
  bookingData: IBooking[]
}