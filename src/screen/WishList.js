import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeWishList } from '../redux/action';
import { useNavigation } from '@react-navigation/native';



const WishList = () => {
  const navigation=useNavigation();
  const[wishListData,setwishListData]=useState([]);
  useEffect(()=>{
    if(wishList){
      setwishListData(wishList.wishList)
   }
  },wishList)
  const wishList = useSelector(state => state.productReducer);
   //console.log( "AddToCart",cart)
  const dispatch = useDispatch();
  const removeFromWishList = product => dispatch(removeWishList(product));
  const handleRemoveWishList = product => {
    removeFromWishList(product);
  };
  return (
    <View>
      <View >

<FlatList
  data={wishListData}
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
            <TouchableOpacity
              onPress={() => handleRemoveWishList(item)}
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

              style={{width:28, height:28, tintColor:'orange'}}
                source={require('../image/heart-filled.png')}
              />
            </TouchableOpacity>


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

export default WishList

const styles = StyleSheet.create({
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