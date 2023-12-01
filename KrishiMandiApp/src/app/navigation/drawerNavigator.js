// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: 'lightgreen',
      }}
      screenOptions={{
        // header: ({ navigation }) => (
        //   // <CustomHeader
        //   //   onMenu={() => navigation.toggleDrawer()}
        //   //   onSearch={(text) => {
        //   //     // Handle search action
        //   //   }}
        //   //   onCart={() => {
        //   //     // Handle cart action
        //   //   }}
        //   // />
        // ),
      }}
    >
      {/* Define your screens here */}
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
