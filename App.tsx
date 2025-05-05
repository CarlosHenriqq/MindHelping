import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes';
import { LinearGradient } from 'react-native-linear-gradient';




const App = () => {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
  <LinearGradient
    colors={['#2980B9', '#8198CF']}
    style={{ 
      height: StatusBar.currentHeight,
      width: '100%',
      position: 'absolute',
      top: 0,
    }}
  />
     <Routes/>
    </NavigationContainer>
  );
};

export default App;