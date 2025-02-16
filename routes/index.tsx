import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Phone, Book, Users, ChartPie, Goal } from 'lucide-react-native'; // Import icons from Lucide
import Home from '../src/pages/Home';
import Perfil from '../src/pages/Perfil';
import Inicial from '../src/pages/Inicial';
import Login from '../src/pages/Login';
import SignUp from '../src/pages/SignUp';
import Call from '../src/pages/Call';
import Diario from '../src/pages/Diario';
import Metas from '../src/pages/Metas';
import Psico from '../src/pages/Psicologo';
import Analystic from '../src/pages/Analystic';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigation = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let IconComponent;

        // Define o ícone correspondente a cada aba
        switch (route.name) {
  
          case 'CVV':
            IconComponent = Phone; // Ícone de telefone
            break;
          case 'Diario':
            IconComponent = Book; // Ícone de livro (diário)
            break;
          case 'Análise':
            IconComponent = ChartPie;
            break;
          case 'Metas':
            IconComponent = Goal; // Ícone de chat
            break;
          case 'Profissionais':
            IconComponent = Users; // Ícone de profissionais (grupo de pessoas)
            break;
        }

        return <IconComponent color={color} size={size} />; // Renderiza o ícone Lucide
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle:{
        backgroundColor:'#e6e6e6',
        borderColor:'black',
      
      
      },
      headerShown: false,
    })}
  >
    <Tabs.Screen name="Home" component={Home} options={{ tabBarButton: () => null }} />
    <Tabs.Screen name="Perfil" component={Perfil} options={{ tabBarButton: () => null }} />
    <Tabs.Screen name="CVV" component={Call} options={{ tabBarLabel: () => null }} />
    <Tabs.Screen name="Diario" component={Diario} options={{ tabBarLabel: () => null }} />
    <Tabs.Screen name='Análise' component={Analystic} options={{ tabBarLabel: () => null }} />
    <Tabs.Screen name="Metas" component={Metas} options={{ tabBarLabel: () => null }} />
    <Tabs.Screen name="Profissionais" component={Psico} options={{ tabBarLabel: () => null }} />
  </Tabs.Navigator>
);

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
}
