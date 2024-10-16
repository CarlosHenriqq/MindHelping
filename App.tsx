import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';



const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#A7BED3" />
     <Routes/>
    </NavigationContainer>
  );
};

export default App;
