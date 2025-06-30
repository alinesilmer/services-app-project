
import React from 'react';
import { Slot } from 'expo-router';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import { AdProvider } from '../context/AdContext';
import Ad from '../components/Ad';

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AdProvider>
          <Slot />
          <Ad />
        </AdProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
