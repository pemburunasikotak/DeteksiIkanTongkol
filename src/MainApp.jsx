import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './screens/SplashScreen';  // Tambahkan SplashScreen
import Login from './screens/Login';
import Home from './screens/Home';
import DeteksiCitra from './screens/DeteksiCitra';
import Profile from './screens/Profile';
import Signup from './screens/Signup';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Beranda') {
            iconName = 'home-outline';
          } else if (route.name === 'Deteksi Citra') {
            iconName = 'camera-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          // Return the Icon component with color and size
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',  // Active tab icon color
        tabBarInactiveTintColor: 'gray',  // Inactive tab icon color
        tabBarStyle: { height: 60 },      // Optional: Set tab bar height
        tabBarIconSize: 24,               // Optional: Set default icon size
      })}
    >
      <Tab.Screen name="Beranda" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="Deteksi Citra" component={DeteksiCitra} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
