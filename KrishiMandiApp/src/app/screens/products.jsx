import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Card, IconButton, Button} from 'react-native-paper';
import CustomHeader from './customHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeApiRequest} from '../services/api';
import {store} from '../redux/store';
import {DrawerActions} from '@react-navigation/native';
import CategoryScreen from './category';

const ProductListingPage = ({navigation, route}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const state = store.getState();
  const [productQuantities, setProductQuantities] = useState({});
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState(''); // Declare setSearchText

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    makeApiRequest(
      'consumer/getProducts',
      'POST',
      {},
      state?.userData?.userData,
    ).then(response => {
      setProducts(response.apiResponseData);
    });
  };

  const adjustQuantity = (productId, change) => {
    setProductQuantities({
      ...productQuantities,
      [productId]: (productQuantities[productId] || 0) + change,
    });
    let product = {
      ...productQuantities,
      [productId]: (productQuantities[productId] || 0) + change,
    };
    console.log(product);
    // Iterate through the quantityMap and retrieve product details
    for (const productId in product) {
      const quantity = product[productId];
      const productDetails = getProductDetails(productId, quantity);

      if (productDetails) {
        console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
        console.log('Product Details:', productDetails);
        console.log('-----------------------------');
      
        let Body = {
          item: productDetails,
          mobileNumber: '9477245638',
        };
        makeApiRequest(
          'consumer/addItemToCart',
          'POST',
          Body,
          state?.userData?.userData,
        ).then(response => {
          console.log(response.apiResponseData);
          // setProducts(response.apiResponseData);
        });
   
      } else {
        console.log(`Product with ID ${productId} not found.`);
      }
    }
  };
  function getProductDetails(productId, quantity) {
    const product = products.find(item => item.id === productId);

    if (product) {
      const {
        name,
        type,
        color,
        price,
        quantity: avai,
        quality,
        about,
        images,
      } = product;

      return {
        id: productId,
        name,
        type,
        color,
        quality,
        price,
        quantity: quantity,
        about,
        images,
      };
    }

    return null;
  }

  const renderItem = ({item}) => (
    <Card style={styles.card}>
      {/* <View style={styles.imageContainer}> */}
      <Image
        style={styles.image}
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg',
        }}
        resizeMode="cover"
      />
      {/* </View> */}
      <Card.Content style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.descriptionText}>
          {item.about}
        </Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        <View style={styles.quantityContainer}>
          <IconButton
            icon="plus"
            color="#000"
            size={16} // Increased icon size
            onPress={() => adjustQuantity(item.id, 1)}
          />
          <Text style={styles.quantityText}>
            {productQuantities[item.id] || 0}
          </Text>
          <IconButton
            icon="minus"
            color="#000"
            size={16} // Increased icon size
            onPress={() => adjustQuantity(item.id, -1)}
          />
        </View>
        {/* <Button
          mode="contained"
          onPress={() => handleBuy(item)}
          style={styles.buyButton}
        >
          Buy Now
        </Button> */}
      </Card.Content>
    </Card>
  );

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleBuy = product => {
    // Implement your buy logic here
    console.log(`Buying ${product.name}`);
  };

  return (
    <View style={styles.container}>
      <CategoryScreen style={{height: windowHeight * 0.3}} />
      <Text style={styles.title}>Products</Text>
      {/* <ScrollView style={styles.container}> */}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={{flexGrow: 1, padding: 2}}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  card: {
    flexDirection: 'row',
    margin: 2,
    width: '48%',
    height: 220, // Increased height to accommodate content
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  descriptionText: {
    maxHeight: 40,
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: 200,
  },
  detailsContainer: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 14, // Increased font size
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12, // Increased font size
    //   marginBottom: 4,
  },
  price: {
    fontSize: 10, // Reduced font size
    marginTop: 2,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2, // Moved from marginBottom to marginTop
  },
  quantityText: {
    marginHorizontal: 1, // Reduced margin
    fontSize: 14, // Increased font size
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    marginTop: 8,
    paddingVertical: 4, // Adjusted padding
  },
});

export default ProductListingPage;
