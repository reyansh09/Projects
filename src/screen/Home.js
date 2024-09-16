import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  fetchProducts,
  fetchCategories,
  addToWishList,
  removeFromWishList,
} from '../redux/prdouctSlice';

// Adjust the path as necessary

const defaultCategoryImage = "https://littleboxindia.com/cdn/shop/files/f1d4802c9c39391020211dc1fb328304_720x.jpg?v=1719493846";

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Selectors
  const {
    products,
    categories,
    wishList,
    loading,
    error,
  } = useSelector(state => state.products);
  // console.log(categories, "product")
  // Handlers
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigation.navigate('Cart'); // Ensure 'Cart' is a valid route
  };

  const handleAddToWishList = (product) => {
    //console.log('hello')
    dispatch(addToWishList(product));
  };

  const handleRemoveFromWishList = (product) => {
    // console.log('hello')
    dispatch(removeFromWishList(product));
  };

  const isInWishList = (product) => {
    // console.log('hello')
    return wishList.some(item => item.id === product.id);
  };

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6347" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={() => {
          dispatch(fetchProducts());
          dispatch(fetchCategories());
        }}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Categories Section */}
      <View style={styles.mainCatContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.catContainer}
              onPress={() => navigation.navigate('CategoryDetail', item)}
            >
              <Image
                style={styles.catImage}
                source={{ uri: defaultCategoryImage }}
              />
              <Text style={styles.catText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Products Section */}
      <View style={styles.mainProductContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Deal of the Day</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllProducts')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const IMAGE_URL = item.images[0];
            const available = "In Stock"; // Assuming all products are in stock; adjust as needed

            return (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetail', item)}
              >
                <Image
                  style={styles.productImage}
                  source={{ uri: IMAGE_URL }}
                />
                <View style={styles.productInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <TouchableOpacity
                      onPress={() => isInWishList(item) ? handleRemoveFromWishList(item) : handleAddToWishList(item)}
                      style={styles.wishListButton}
                    >
                      <Image
                        style={isInWishList(item) ? styles.heartFilled : styles.heartOutline}
                        source={
                          isInWishList(item)
                            ? require('../image/heart-filled.png') // Ensure this path is correct
                            : require('../image/heart.png') // Ensure this path is correct
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productPrice}>
                    ${item.price}{' '}
                    <Text style={styles.originalPrice}>
                      ${parseFloat((item.price * (100 / (100 - item.discountPercentage))).toFixed(2))}
                    </Text>
                    <Text style={styles.discountPercentage}>
                      {' '}
                      {item.discountPercentage}%
                    </Text>
                  </Text>
                  <Text
                    style={available === item.availabilityStatus ? styles.statusAvailable : styles.statusUnavailable}
                  >
                    {item.availabilityStatus || available}
                  </Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Image
                      style={styles.cartIcon}
                      source={require('../image/cart.png')} // Ensure this path is correct
                    />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
  mainCatContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  catContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  catImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  catText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    width: 80,
  },
  mainProductContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginVertical: 10,
  },
  seeAllText: {
    fontSize: 16,
    color: '#ff6347',
    fontWeight: '400',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#EEEFF4',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    paddingRight: 10,
  },
  wishListButton: {
    padding: 5,
  },
  heartOutline: {
    width: 25,
    height: 25,
    tintColor: '#000',
  },
  heartFilled: {
    width: 25,
    height: 25,
    tintColor: 'red',
  },
  productPrice: {
    fontSize: 12,
    color: '#000',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#808080',
    fontSize: 10,
  },
  discountPercentage: {
    color: 'red',
    fontWeight: '500',
    fontSize: 10,
  },
  statusAvailable: {
    fontSize: 13,
    color: 'green',
    marginTop: 5,
    fontWeight: '400',
  },
  statusUnavailable: {
    fontSize: 13,
    color: 'red',
    marginTop: 5,
    fontWeight: '400',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cartIcon: {
    width: 20,
    height: 20,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 16,
    color: '#ff6347',
    fontWeight: '500',
  },
});
