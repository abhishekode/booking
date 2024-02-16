import React from 'react';
import Layout from 'components/layout';
import { ToastContainer } from 'react-toastify';
import { BookingProvider } from 'context/bookingContext';

const App = () => (
	<BookingProvider>
		<ToastContainer progressClassName="toastProgress" position='top-center' />
		<Layout />
	</BookingProvider>
);

export default App;
