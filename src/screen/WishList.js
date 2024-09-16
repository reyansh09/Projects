import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addToCart, removeFromWishList } from '../redux/prdouctSlice';



const WishList = () => {
  const navigation = useNavigation();


  //Add to Cart
  const handleAddToCart = product => {
    dispatch(addToCart(product));
    navigation.navigate('Cart'); // Navigate to Cart tab
  };


  const wishList = useSelector(state => state.products.wishList);
  //console.log( "AddToCart",cart)
  const dispatch = useDispatch();
  const handleRemoveFromWishList = (product) => {
    // console.log('hello')
    dispatch(removeFromWishList(product));
  };



  

  return (
    <View style={styles.container}>
     { wishList.length > 0? ( <View >

        <FlatList
          data={wishList}
          //keyExtractor={item => item.id.toString()}
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
                  <View style={styles.rowCiantainer}>
                    <Text style={styles.textTitle}>
                      {item.title}
                    </Text>

                    <TouchableOpacity
                      onPress={() => handleRemoveFromWishList(item)}
                      activeOpacity={0.7}
                      style={styles.addHeart}>


                      <Image

                        style={styles.addToImageRed}
                        source={require('../image/heart-filled.png')}
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
                    <Text style={available == item.availabilityStatus ? styles.availabilityStatusGreen : styles.availabilityStatusRed}>
                      {item.availabilityStatus}
                    </Text>

                    <View style={styles.addToCartContainer}>
                      <TouchableOpacity 
                      style={styles.addToCartContainer}
                      onPress={() => handleAddToCart(item)}
                      >
                        <Image
                          style={styles.addToCartImage}
                          source={require('../image/cart.png')}
                        />
                        <Text style={styles.addToCartText}>Add to Cart</Text>
                      </TouchableOpacity>

                      <Text style={styles.removeText}
                        onPress={() => handleRemoveFromWishList(item)}
                      >Remove</Text>

                    </View>
                  </View>

                </View>


              </TouchableOpacity>
            )
          }
          }
        />
      </View>):
      (<View style={styles.emptyContainer}>
      <Image
        source={require('../image/empty.jpg')}
        style={styles.emptyImage}
      />
        <Text style={styles.emptyHeading}> Whoops!! WishList is Empty</Text>
        <Text style={styles.emptyDes}>Looks like you haven't added anything to your wishlist yet. You will find a lot of interesting Products on our "Shop" page</Text>
        <TouchableOpacity
        onPress={()=>{
         navigation.replace('MultiKart')
        }}
        style={styles.buttonContainer}>
          <Text style={styles.emptyText}>
            START SHOPPING
          </Text>
        </TouchableOpacity>
      </View>)
       }

    </View>
  )
}

export default WishList

const styles = StyleSheet.create({
  emptyContainer:{
       flex:1,
       justifyContent:'center',
       alignItems:'center'
  },
  buttonContainer:{
       width:'90%',
       height:50,
       backgroundColor:'#FF4C3B',
       borderRadius:4,
       marginTop:25,
       justifyContent:'center'
  },
  emptyHeading:{
    fontSize:22,
    color:'#000000',
    fontWeight:'bold'

  },
  emptyText:{
    fontSize:20,
    alignSelf:'center',
    color:'#FFFFFF',
    fontWeight:'400'
  },
  emptyImage:{
   height:200,
   width:200,
   

  },
  emptyDes:{
    fontSize:19,
    textAlign:'center',
    marginTop:20
    

  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  rowCiantainer: {
    flexDirection: 'row',
    width: '100%'
  },
  ProductCart: {
    flexDirection: 'row',
    width: "95%",
    alignItems: 'center',
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // elevation: 3,
    height: 160,
    borderBottomWidth: 5,
    borderBottomColor: '#D3D3D3'
  },
  PrdouctText: {
    flex: 1,
    flexDirection: 'column',
    marginStart: 5
  },
  productImage: {
    height: 100,
    width: 100
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
  addToImageRed: {
    width: 25,
    height: 25,
    marginRight: 20,
    tintColor: 'red',
    // alignSelf:'center'
  },
  availabilityStatusGreen: {
    fontSize: 13,
    color: 'green',
    marginTop: 5,
    fontWeight: '400'
  },
  availabilityStatusRed: {
    fontSize: 13,
    color: 'red',
    marginTop: 5,
    fontWeight: '400'
  },
  textHeding: {
    fontSize: 18,
    margin: 10,
    color: 'black',

    fontWeight: '500'
  },
  addHeart: {
    padding: 5,
    borderRadius: 20,
    height: 30,
    width: 30,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center'

  },
  addToCartImage: {
    height: 20,
    width: 20,
    marginTop: 8
  },
  addToCartText: {
    marginTop: 10,
    marginStart: 5,
    fontSize: 15,
    color: '#000',
    borderRightWidth: 2,
    paddingEnd: 15,
    fontWeight: '600'
  },
  removeText: {
    marginTop: 10,
    marginStart: 20,
    fontSize: 15,
    color: '#000',
    fontWeight: '600'

  },addToCartContainer:{
    flexDirection: 'row',
     alignContent: 'center'
  }
})