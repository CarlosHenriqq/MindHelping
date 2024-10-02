import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';



const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFD8BE" />
     <Routes/>
    </NavigationContainer>
  );
};

export default App;
