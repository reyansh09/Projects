// screens/Cart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addWishList, clearCart, decreaseQuantity, increaseQuantity, removeCart, removeWishList } from '../redux/action';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.productReducer);
  const addToWishList = product => dispatch(addWishList(product));
  const removeToWishList = product => dispatch(removeWishList(product));
  const handleAddToWishList = product => addToWishList(product);
  const handleRemoveToWishList = product => removeToWishList(product);

  const handleIncreaseQuantity = id => dispatch(increaseQuantity(id));
  const handleDecreaseQuantity = id => dispatch(decreaseQuantity(id));
  const handleClearCart = () => dispatch(clearCart());

  const wishList = useSelector(state => state.productReducer);

  const exists = product => wishList.wishList.some(item => item.id === product.id);

  const removeFromCartList = product => dispatch(removeCart(product));
  const handleRemoveCartList = product => removeFromCartList(product);

  const totalPrice = cartItems.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cartItems.items.length > 0 ? (
        <>
          <FlatList
            data={cartItems.items}
            renderItem={({ item }) => {
              const available = "In Stock";
              return (
                <View style={styles.cartItem}>
                  <Image
                    resizeMode='center'
                    style={styles.imageSize}
                    source={{ uri: item.images[0] }}
                  />
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>{`$ ${item.price}`}</Text>
                    <Text
                      style={available == item.availabilityStatus ? styles.availabilityStatusGreen : styles.availabilityStatusRed}
                    >
                      {item.availabilityStatus}
                    </Text>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
                        <Image style={styles.minusBtn} source={require('../image/minus.png')} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                        <Image style={styles.moreBtn} source={require('../image/more.png')} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                      <TouchableOpacity
                        style={{ flexDirection: 'row' }}
                        onPress={() =>
                          exists(item) ? handleRemoveToWishList(item) : handleAddToWishList(item)
                        }
                      >
                        <Image
                          style={exists(item) ? styles.addToImageRed : styles.addToImage}
                          source={
                            exists(item) ? require('../image/heart-filled.png') : require('../image/heart.png')
                          }
                        />
                        <Text style={styles.addToCartText}>Move to WishList</Text>
                      </TouchableOpacity>
                      <Text style={styles.removeText} onPress={() => handleRemoveCartList(item)}>
                        Remove
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />

          <View style={styles.totalContainer}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalTextPrice}>{`$${totalPrice.toFixed(2)}`}</Text>
              <Text style={styles.totalText}>Total Amount:</Text>
            </View>

            <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
              <Text style={styles.clearCartText}>Clear Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Image source={require('../image/empty.jpg')} style={styles.emptyImage} />
          <Text style={styles.emptyHeading}>Your Cart is Empty</Text>
          <Text style={styles.emptyDes}>
            Looks like you haven't added anything to your cart yet. Browse products on the "Shop" page.
          </Text>
          <TouchableOpacity onPress={() => navigation.replace('MultiKart')} style={styles.buttonContainer}>
            <Text style={styles.emptyText}>START SHOPPING</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },

  cartItem: {
    padding: 10,
    borderBottomWidth: 8,
    borderBottomColor: '#D3D3D3',
    flexDirection: 'row',
    height: 180,
    backgroundColor: '#FFFFFF',
    width: '100%'
  },
  itemTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#EEEFF4',
    width: 140,
    height: 50,
    justifyContent: 'center',

  },
  imageSize: {
    height: 100,
    width: 100
  },
  quantityButton: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color: 'black',
    marginHorizontal: 10,
  },
  availabilityStatusGreen: {
    fontSize: 12,
    color: 'green',

    fontWeight: '400'
  },
  availabilityStatusRed: {
    fontSize: 12,
    color: 'red',

    fontWeight: '400'
  },
  clearCartButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FF4C3B',
    alignItems: 'center',
    borderRadius: 5,

  },
  clearCartText: {
    color: '#fff',
    fontSize: 15,
  },
  totalItemPrice: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  totalContainer: {

    marginTop: 20,
    flexDirection: 'row'

  },
  totalText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '400',
  },
  totalTextPrice: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
  minusBtn: {
    height: 25,
    width: 25,
    marginEnd: 10
  },
  moreBtn: {
    height: 25,
    width: 25,
    marginStart: 10
  },
  addToCartImage: {
    height: 20,
    width: 20,
    marginTop: 8
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
    marginStart: 40,
    fontSize: 15,
    color: '#000',
    fontWeight: '600'

  },
  totalPriceContainer: {
    flex: 1,
    justifyContent: 'center'

  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyImage: {
    height: 200,
    width: 200,
  },
  emptyHeading: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyDes: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    width: '90%',
    height: 50,
    backgroundColor: '#FF4C3B',
    borderRadius: 4,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default Cart;

