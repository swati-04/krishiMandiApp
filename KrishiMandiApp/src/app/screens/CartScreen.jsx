import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any icon library you prefer
import { store } from '../redux/store';

const CartScreen = () => {
  const state=store.getState()
  const [cartData, setCartData] = useState([
    { id: 'ab519a0d-8fa4-4f3f-aff4-a0b782dbbef6', name: 'Potato', price: 25, quantity: 1 },
    { id: 'aba9e883-5b56-4916-91de-2f8d2f30013a', name: 'Tomato', price: 48, quantity: 2 },
    // Add more items as needed
  ]);
useEffect(() => {
  const mobileNumber = '9477245638';

  let completeObject = {
    mobileNumber: mobileNumber,
  };
  makeApiRequest(
    'consumer/getUserProfile',
    'POST',
    completeObject,
    state?.userData?.userData,
  ).then(response => {
    console.log(response.apiResponseData.cart);
    // setProducts(response.apiResponseData);
  });
  console.log(completeObject);
}, [])

  const [address, setAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const increaseQuantity = (itemId) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartData((prevCartData) =>
      prevCartData.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const deleteItem = (itemId) => {
    setCartData((prevCartData) => prevCartData.filter((item) => item.id !== itemId));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={styles.itemImage}
        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image, replace with actual URL
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.total}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteIconContainer}>
        <Icon name="trash-o" size={18} color="#ff4d4d" />
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
      

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={cartData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.flatList}
      />

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Delivery Address:</Text>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            setAddress(data.description);
            setSelectedAddress(details.geometry.location);
          }}
          query={{
            key: 'YOUR_GOOGLE_MAPS_API_KEY',
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
              zIndex: 1,
            },
            textInputContainer: {
              borderWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 1,
              borderColor: '#ddd',
              backgroundColor: 'transparent',
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 14,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={false}
        />
        {selectedAddress && (
          <MapView
            style={{ height: 120, marginVertical: 10 }}
            region={{
              latitude: selectedAddress.lat,
              longitude: selectedAddress.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedAddress.lat,
                longitude: selectedAddress.lng,
              }}
            />
          </MapView>
        )}
      </View>

      <View style={styles.billContainer}>
        <Text style={styles.billLabel}>Bill Details</Text>
        <Text>Total Items: {cartData.length}</Text>
        <Text>Total Amount: ${calculateTotal().toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // White background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff', // White background
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 3,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  quantityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'gray',
    fontSize: 12,
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 12,
    marginHorizontal: 6,
    color: '#333',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#333',
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  flatList: {
    flexGrow: 0,
  },
  addressContainer: {
    backgroundColor: '#fff', // White background
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  billContainer: {
    backgroundColor: '#fff', // White background
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  billLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  checkoutButton: {
    backgroundColor: 'lightgreen', // Red color (you can change it to your preferred color)
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff', // White color
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CartScreen;
