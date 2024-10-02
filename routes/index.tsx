import React from 'react';
import {Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../src/pages/Home';
import Perfil from '../src/pages/Perfil';
import Inicial from '../src/pages/Inicial';
import Login from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import Call from '../src/pages/Call';
import Diario from '../src/pages/Diario';
import LinearGradient from 'react-native-linear-gradient';


const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigation = () => (
<Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconSource;
        
        // Define o ícone correspondente a cada aba
        switch (route.name) {
          case 'Perfil':
            iconSource = require('../assets/img/perfil_nav.png');
            break;
          case 'Home':
            iconSource = require('../assets/img/home_nav.png');
            break;
            case 'Call':
            iconSource = require('../assets/img/telefone_nav.png');
            break;    
            case 'Diario':
            iconSource = require('../assets/img/diario_nav.png');
            break;       
        }

        return (
          <Image
            source={iconSource} // Fonte do ícone correspondente à aba
            style={{ width: size, height: size, tintColor: color }}
            resizeMode="contain"
          />
        );
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
     <Tabs.Screen name="Perfil" component={Perfil} />
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Call" component={Call} />
    <Tabs.Screen name="Diario" component={Diario} />
  </Tabs.Navigator>
);

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />

    
   

    </Stack.Navigator>
  );
}
