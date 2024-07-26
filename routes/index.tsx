import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../src/pages/Home';
import Perfil from '../src/pages/Perfil';
import Inicial from '../src/pages/Inicial';
import Login from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import LinearGradient from 'react-native-linear-gradient';


const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigation = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Perfil') {
          iconName = focused ? 'ios-settings' : 'ios-list-settings';
        } 

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarBackground: () => (
        <LinearGradient
        colors={['#68327e', '#9b59b6']} // Substitua pelas cores do gradiente desejado
          style={{ flex: 1 }}
        />
      ),
      headerShown: false,
     
    })}
  >
      
    <Tabs.Screen name="Perfil" component={Perfil} />
 
  </Tabs.Navigator>
);

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Tab" component={TabNavigation} />

    
   

    </Stack.Navigator>
  );
}
