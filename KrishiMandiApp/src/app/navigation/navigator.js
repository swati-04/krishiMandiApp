// import { createStackNavigator } from '@react-navigation/stack';
// import MainScreen from '../screens/mainScreen';
// import SplashScreen from '../screens/splashScreen';
// import LoginScreen from '../screens/login';
// import OTPScreen from '../screens/otpScreen';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/homeScreen';
// import AccountsScreen from '../screens/account';
// import CategoryScreen from '../screens/category';
// import CustomHeader from '../screens/customHeader';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//     <Tab.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="home" color="green" size={size} />
//         ),
//              headerShown:false,
//       }}
//     />
//         <Tab.Screen
//       name="Category"
//       component={CategoryScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="bars" color="green" size={size} />
//         ),
//         headerShown:false,
//       }}
//     />
//         <Tab.Screen
//       name="Account"
//       component={AccountsScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="user" color="green" size={size} />
//         ),
//         headerShown:false,
//       }}
//     />
//     {/* Add more tab screens as needed */}
//   </Tab.Navigator>
//   );
// }


// const DrawerNavigator = () => (
//   <Drawer.Navigator drawerContent={CustomHeader}>
//     <Drawer.Screen name="Home" component={HomeScreen} />
//     {/* Add more drawer screens as needed */}
//   </Drawer.Navigator>
// );
// function AppNavigator() {
//   return (
//       <Stack.Navigator initialRouteName="HomeTabs"  screenOptions={{
//         headerShown: false, 
//       }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Main" component={MainScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Otp" component={OTPScreen} />

//         <Stack.Screen name="HomeTabs" component={HomeTabs} />
//         <Stack.Screen name="Drawer" component={DrawerNavigator} />
//       </Stack.Navigator>
//   );
// }

// export default AppNavigator;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/homeScreen';
import MainScreen from '../screens/mainScreen';
import OTPScreen from '../screens/otpScreen';
import CategoryScreen from '../screens/category';
import AccountsScreen from '../screens/account';
import ProductListingPage from '../screens/products';
import CustomDrawerContent from '../screens/draweContent';
import CartScreen from '../screens/CartScreen';
import { store } from '../redux/store';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => (
      <Stack.Navigator initialRouteName="Splash"  screenOptions={{
        headerShown: false, 
      }}>
         <Stack.Screen name="Splash" component={SplashScreen} />
         <Stack.Screen name="Main" component={MainScreen} />
         <Stack.Screen name="Login" component={LoginScreen} />
         <Stack.Screen name="Otp" component={OTPScreen} />

  </Stack.Navigator>
);

const HomeTabs = () => (
    <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color="green" size={size} />
        ),
             headerShown:false,
      }}
    />
        <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bars" color="green" size={size} />
        ),
        headerShown:false,
      }}
    />
        <Tab.Screen
      name="Account"
      component={CustomDrawerContent}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color="green" size={size} />
        ),
        headerShown:false,
      }}
    />
    {/* Add more tab screens as needed */}
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Drawer.Navigator screenOptions={{
    headerShown: false, 
  }}>
    <Drawer.Screen name="Home" component={HomeTabs} />
    <Drawer.Screen name="Cart" component={CartScreen} />

      <Drawer.Screen name="Profile" component={CustomDrawerContent} />
    <Drawer.Screen name="Account" component={AccountsScreen} />
    <Drawer.Screen name="Settings" component={ProductListingPage} />
    {/* Add more screens to Drawer Navigator as needed */}
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const isLoggedIn = true; // Set this based on your authentication logic
  const state=store.getState()

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainNavigator />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
