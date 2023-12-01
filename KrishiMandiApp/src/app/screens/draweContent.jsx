import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const navigateToScreen = (routeName) => () => {
    navigation.navigate(routeName);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* Custom Header */}
        <View style={styles.drawerHeader}>
          <Avatar.Image
            source={{
              uri: 'https://example.com/avatar.jpg',
            }}
            size={50}
          />
          <View style={{ marginLeft: 15, flexDirection: 'column' }}>
            <Title>Your Name</Title>
            <Caption>YourEmail@example.com</Caption>
          </View>
        </View>

        {/* Drawer Items */}
        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => <Icon name="home-outline" color={color} size={size} />}
            label="Home"
            onPress={navigateToScreen('Home')}
          />
          <DrawerItem
            icon={({ color, size }) => <Icon name="account-outline" color={color} size={size} />}
            label="Profile"
            onPress={navigateToScreen('Profile')}
          />
          {/* Add more DrawerItems as needed */}
        </Drawer.Section>

        {/* Custom Section */}
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>

      {/* Custom Footer */}
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
});

export default CustomDrawerContent;
