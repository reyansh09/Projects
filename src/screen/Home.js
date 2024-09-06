import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { addCartList, addWishList, getCategory, getProduct, removeWishList } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';



const image = [
  {
    url: "https://littleboxindia.com/cdn/shop/files/f1d4802c9c39391020211dc1fb328304_720x.jpg?v=1719493846",
  },
]
export default Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState([])
  const [cat, setCat] = useState([]);


  const handleAddToCart = product => {
    dispatch(addCartList(product));
    navigation.navigate('Cart'); // Navigate to Cart tab
  };
  const addToWishList = product => dispatch(addWishList(product));
  const removeToWishList = product => dispatch(removeWishList(product));
  const handleAddToWishList = product => {

    addToWishList(product);
    //console.log('add', product.id)
  };
  const handleRemoveToWishList = product => {
    removeToWishList(product);
    //console.log('remove', product)
  };

  useEffect(() => {
    if (productReducer) {
      setData(productReducer.product.products)
    }
    if (category) {
      setCat(category.category)
    }
  }, productReducer, category)

  const productReducer = useSelector(state => state.productReducer);
  const category = useSelector(state => state.productReducer)
  const wishList = useSelector(state => state.productReducer)
  const exists = product => {
    //console.log(product);
    if (wishList.wishList.filter(item => item.id === product.id).length > 0) {
      return true;
    }
    return false;
  };
  const fetchProduct = () => dispatch(getProduct());
  const fetachCategory = () => dispatch(getCategory());
  useEffect(() => {
    fetchProduct();
    fetachCategory();

  }, []);
  return (

    <View style={{ marginBottom: 60 }}>

      <View style={styles.mainCatContainer}>
        <FlatList
          horizontal={true}
          data={cat}

          renderItem={({ item }) => <TouchableOpacity
            onPress={() => navigation.navigate('CategoryDetail', item)}
          >
            <View style={styles.catContainer}>
              <Image
                style={styles.catImage}
                source={{ uri: image[0].url }}
              />
              <Text style={styles.catText}>{item.name}</Text>
            </View>

          </TouchableOpacity>}
        />
      </View>



      <View style={styles.mainProductContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textHeding}>
            Deal of the Day
          </Text>
          <Text style={styles.textSeeAll}>
            See All
          </Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const IMAGE_URL = item.images[0]
            const available = "In Stock"
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', item)}
                style={styles.ProductCart}>

                <Image
                  style={styles.productImage}
                  source={{ uri: IMAGE_URL }}
                />
                <View style={styles.PrdouctText}>
                  <View style={styles.rowContainer}>
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
                  <View >
                    <Text
                      style={available == item.availabilityStatus ? (styles.availabilityStatusGreen) : (styles.availabilityStatusRed)}>
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
                </View>
              </TouchableOpacity>
            )
          }
          }
        />
      </View>

      <View style={{ height: 60, width: '100%', position: 'absolute', }}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainProductContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,

  },
  rowContainer:{
    flexDirection:'row',
    width:'100%'
  },
  mainCatContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
    paddingTop: 10,

  },
  container: {
    flex: 1,
  },
  catText: {
    fontSize: 14,
    color: 'black',
    width: 100,
    textAlign: 'center'
  },
  catContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  catImage: {
    borderRadius: 40,
    height: 80,
    width: 80
  },
  cartImage:{
    height:20,
    width:20
  },
  productImage: {
    width: 100,
    height: 100
  },
  ProductCart: {
    flexDirection: 'row',
    width: "90%",
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EEEFF4',
    elevation: 1,
    height: 140
  },
  PrdouctText: {
    flexDirection: 'column',
    marginStart: 5,
    flex: 1
  },
  addToImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  addToImageRed: {
    width: 25,
    height: 25,
    marginRight: 10,
    tintColor: 'red'
  },
  addCartHeart: {
    padding: 5,
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center'
  },
  textTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: 'black'

  },
  textPrice: {
    fontSize: 12,
    color: 'black',

  },
  availabilityStatusRed: {
    fontSize: 13,
    color: 'red',
    marginTop: 5,
    fontWeight: '400'
  },
  availabilityStatusGreen: {
    fontSize: 13,
    color: 'green',
    marginTop: 5,
    fontWeight: '400'
  },
  textHeding: {
    flex: 1,
    fontSize: 18,
    margin: 10,
    color: 'black',
    fontWeight: '500'
  },
  textSeeAll: {
    fontSize: 16,
    alignSelf: 'center',
    padding: 10,
    color: 'red',
    fontWeight: '400'
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

  }
})