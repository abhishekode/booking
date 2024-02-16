import React from "react";
import Home from "../pages/Home";
import Booking from "pages/Booking";
import BookingConfirm from "pages/BookingConfirm";


export const publicRoutes = [
	{
		id: '1',
		path: "/",
		element: <Home />,
	},
	{
		id: '2',
		path: "/booking-new",
		element: < Booking />,
	},
	{
		id: '3',
		path: "/booking/:seatNumber",
		element: <BookingConfirm />,
	}
]
