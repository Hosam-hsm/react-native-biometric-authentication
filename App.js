import 'react-native-gesture-handler';
import React from 'react';
import MainNavigator from './src';
import { store, StoreProvider } from './src/store/Store';

export default function App() {
  return (
    <StoreProvider store={store}>
      <MainNavigator />
    </StoreProvider>
  );
}

