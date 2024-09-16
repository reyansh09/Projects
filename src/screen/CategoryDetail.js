import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishList, removeFromWishList } from '../redux/prdouctSlice';

const CategoryDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { name, url } = route.params;
  const navigation = useNavigation();
  const [typCat, setTypCat] = useState([]);

  const addToWishLists = product => dispatch(addToWishList(product));
  const removeToWishList = product => dispatch(removeFromWishList(product));
  const handleAddToWishList = product => {
    addToWishLists(product);
    //console.log('add', product.id)
  };
  const handleRemoveToWishList = product => {
    removeToWishList(product);
    //console.log('remove', product)
  };

  const wishList = useSelector(state => state.products.wishList)


  const exists = product => {
    //console.log(product);
    if (wishList.filter(item => item.id === product.id).length > 0) {
      return true;
    }
    return false;
  };

  //add to cart
  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigation.navigate('Cart'); // Navigate to Cart tab
  };

  const getCatData = async () => {
    const type = url;
    let result = await fetch(type);
    result = await result.json();
    setTypCat(result.products);
  };

  useEffect(() => {
    getCatData()
  }, [])
  const {  
    loading,
    error,
  } = useSelector(state => state.products);

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
          getCatData();
        }}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  console.log(slug)
  return (
    <View style={styles.container}>
      <Text
        style={styles.headingText}>
        {name}
      </Text>
      <FlatList
        data={typCat}
        //keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const IMAGE_URL = item.images[0]
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', item)}
              style={styles.ProductCart}>
              <Image
                style={styles.productImage}
                source={{ uri: IMAGE_URL }}
              />
              <View style={styles.PrdouctText}>
                <View style={styles.titleWishlist}>
                  <Text style={styles.textTitle}>
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      exists(item) ? handleRemoveToWishList(item) : handleAddToWishList(item)
                    }
                    activeOpacity={0.7}
                    style={styles.addCartHeart}>

                    <Image
                      style={exists(item) ? styles.addToImageRed : styles.addToImage}
                      source={
                        exists(item) ? (require('../image/heart-filled.png')) : (require('../image/heart.png'))
                      }
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={styles.textPrice}>
                  {`$ ${item.price} `} <Text style={{ textDecorationLine: 'line-through' }}>
                    {`$${parseFloat(((item.discountPercentage * 100) / item.price).toFixed(1))}`} </Text>
                  <Text style={{ color: 'red', fontWeight: '500' }}> {` ${item.discountPercentage}%`}</Text>
                </Text>
                <Text style={styles.availabilityStatus}>
                  {item.availabilityStatus}
                </Text>

                <View >

                      <TouchableOpacity
                        style={styles.addtoContainer}
                        onPress={() => handleAddToCart(item)}
                      >
                        <Image
                          style={styles.cartImage}
                          source={require('../image/cart.png')}
                        />
                        <Text style={styles.addToCartText}> Add to Cart</Text>
                      </TouchableOpacity>
                    </View>
              </View>
            </TouchableOpacity>
          )
        }
        }
      />
    </View>
  )
}

export default CategoryDetail

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#FFFFFF',
    marginBottom: 80,


  },
  catText: {
    fontSize: 20,
    padding: 10,
    fontWeight: '500',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    marginStart: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5

  },
  productImage: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  ProductCart: {
    flexDirection: 'row',
    width: "95%",
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EEEFF4',
    elevation: 2,
    height: 150,

  },
  PrdouctText: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 5
  },
  textTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: 'black',



  },
  textPrice: {
    fontSize: 14,
    color: 'black',

  },
  availabilityStatus: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
    fontWeight: '400'
  },
  textHeding: {
    fontSize: 18,
    margin: 10,
    color: 'black',

    fontWeight: '500'
  },

  headingText: {
    fontSize: 22,
    margin: 10,
    fontWeight: '600',
    color: 'black',

  },
  addToImage: {
    width: 18,
    height: 18,
    marginTop: 12,
  },
  addToImageRed: {
    width: 18,
    height: 18,
    tintColor: 'red',
    marginTop: 12,
  },
  titleWishlist: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  addtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 5,
    color: 'black'

  },
  cartImage:{
    height:20,
    width:20
  },
})