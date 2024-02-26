import React from 'react'
import Router from './src/navigation'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper'
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <Router/>
        </PaperProvider>
      </PersistGate>
    </Provider>
  )
}

export default App