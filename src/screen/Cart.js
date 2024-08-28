// screens/Cart.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity } from '../redux/action';


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.productReducer);
  //console.log(cartItems,"hello")

  const handleIncreaseQuantity = id => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = id => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    console.log('hey')
    dispatch(clearCart());
  };



  const totalPrice = cartItems.items.reduce((acc, item) => acc + item.price * item.quantity, 0);



  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems.items}
        renderItem={({ item }) => (
         
          <View style={styles.cartItem}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>{`$ ${item.price}`}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
            
          </View>
         
         
        )}
      // keyExtractor={item => item.id.toString()}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>{`Total Price: $${totalPrice.toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
        <Text style={styles.clearCartText}>Clear Cart</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 18,
    color:'black',
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color:'black',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color:'black',
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    color:'black',
    marginHorizontal: 10,
  },
  clearCartButton: {
    padding: 15,
    backgroundColor: 'orange',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  clearCartText: {
    color: '#fff',
    fontSize: 16,
  },
  totalItemPrice: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Cart;
