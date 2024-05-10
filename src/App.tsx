import React from 'react';
import Layout from 'components/layout';
import { ToastContainer } from 'react-toastify';
import { BookingProvider } from 'context/bookingContext';
import { CodeEditorProvider } from 'context/codeEditorContext';

const App = () => (
	<BookingProvider>
		<CodeEditorProvider>
			<ToastContainer progressClassName="toastProgress" position='top-center' />
			<Layout />
		</CodeEditorProvider>
	</BookingProvider>
);

export default App;
