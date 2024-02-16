import React from "react";
import Home from "../pages/Home";
import Booking from "pages/Booking";


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
]
