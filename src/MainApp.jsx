import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';  // Tambahkan SplashScreen
import Login from './screens/Login';
import Home from './screens/Home';
import DeteksiCitra from './screens/DeteksiCitra';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Beranda"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen
        name="Deteksi Citra"
        component={DeteksiCitra}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="camera-outline" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
