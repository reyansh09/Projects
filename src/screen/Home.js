import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native';
import { addCartList, addWishList, getCategory, getProduct, removeWishList } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';



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



  // const navigation = useNavigation();
  return (

    <View style={{ marginBottom: 80 }}>
      <View >
        <FlatList
          horizontal={true}
          data={cat}

          renderItem={({ item }) => <TouchableOpacity
            onPress={() => navigation.navigate('CategoryDetail', item)}
          >
            <Text style={styles.catText}>{item.name}</Text>
          </TouchableOpacity>}
        />
      </View>

      <Text style={styles.textHeding}>
        Deal of the Day
      </Text>
      <View >

        <FlatList
          data={data}
          //keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const IMAGE_URL = item.images[0]
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetail', item)}
                style={styles.ProductCart}>

                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: IMAGE_URL }}
                />
                <View style={styles.PrdouctText}>
                  <Text style={styles.textTitle}>
                    {item.title}
                  </Text>
                  <Text
                    style={styles.textPrice}>
                    {`$ ${item.price} `} <Text style={{ textDecorationLine: 'line-through' }}>
                      {`$${parseFloat(((item.discountPercentage * 100) / item.price).toFixed(1))}`} </Text>
                    <Text style={{ color: 'red', fontWeight: '500' }}> {` ${item.discountPercentage}%`}</Text>



                  </Text>
                  <View >
                    <Text style={styles.availabilityStatus}>
                      {item.availabilityStatus}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                      <TouchableOpacity
                        onPress={() =>
                          exists(item) ? handleRemoveToWishList(item) : handleAddToWishList(item)
                        }
                        activeOpacity={0.7}
                        style={{
                          flexDirection: 'row',
                          padding: 2,
                          borderRadius: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 40,
                          width: 40,
                        }}>
                        <Image
                          style={{ width: 28, height: 28, tintColor: 'orange',marginRight:10 }}
                          source={
                            exists(item) ? (require('../image/heart-filled.png')) : (require('../image/heart.png'))
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                       onPress={() => handleAddToCart(item)}
                      >
                      <Image
                        style={{ width: 30, height: 30, tintColor: 'orange' }}
                        source={require('../image/addToCart.png')}
                      />
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
    </View>
  )
}

const styles = StyleSheet.create({
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
  ProductCart: {
    flexDirection: 'row',

    width: "95%",
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#EEEFF4',
    elevation: 3
  },
  PrdouctText: {
    flexDirection: 'column',
    marginStart: 5
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black'

  },
  textPrice: {
    fontSize: 16,
    color: 'black',

  },
  availabilityStatus: {
    fontSize: 16,
    color: 'red',
    marginTop: 5,
    fontWeight: '400'
  },
  textHeding: {
    fontSize: 18,
    margin: 10,
    color: 'black',

    fontWeight: '500'
  }
})