import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import DriverDetailsScreen from './src/screens/DriverDetailsScreen';
import DriversScreen from './src/screens/DriversScreen';
import { persistor, store } from './src/store/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Drivers" component={DriversScreen} />
          <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
