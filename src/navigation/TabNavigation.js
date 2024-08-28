import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Category from '../screen/Category';
import Cart from '../screen/Cart';
import { Ionicons } from '@expo/vector-icons';
import WishList from '../screen/WishList';
import Profile from '../screen/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductDetail from '../screen/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryDetail from '../screen/CategoryDetail';


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();


function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail} />
      <HomeStack.Screen name="CategoryDetail" component={CategoryDetail} />
    </HomeStack.Navigator>
  );
}

function CategoryStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Category" component={Category} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail} />
      <HomeStack.Screen name="CategoryDetail" component={CategoryDetail} />
    </HomeStack.Navigator>
  );
}

function WishListStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="WishList" component={WishList} />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail} />
    </HomeStack.Navigator>
  );
}






const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      >
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          options={{
            headerShown: false,
            title: 'Home',
            
           
            tabBarIcon: ({ focused })=><Image
           
            style={
              focused?{height:20, width:20,tintColor:'orange'}:{height:20, width:20}
            }

              source={require('../image/home.png')}
            />
            

          }}



        />
        <Tab.Screen name="CategoryStackScreen"
          component={CategoryStackScreen}
          options={{ headerShown: false
            ,
            title: 'ategory',
            
            tabBarIcon: ({ focused })=><Image
           
            style={
              focused?{height:20, width:20,tintColor:'orange'}:{height:20, width:20}
            }

              source={require('../image/category.png')}
            /> }} 
            
          />

        <Tab.Screen name="Cart" component={Cart} 
          options={{
            title: 'Cart',
            
            tabBarIcon: ({ focused })=><Image
           
            style={
              focused?{height:20, width:20,tintColor:'orange'}:{height:20, width:20}
            }

              source={require('../image/cart.png')}
            /> 
          }}
        />


        <Tab.Screen name="WishListStackScreen"
          component={WishListStackScreen}
          options={{ headerShown: false
            ,
            title: 'WishList',
            
            tabBarIcon: ({ focused })=><Image
           
            style={
              focused?{height:20, width:20,tintColor:'orange'}:{height:20, width:20}
            }

              source={require('../image/wishlist.png')}
            />
           }}
        />


        <Tab.Screen name="Profile" component={Profile} 
          options={{ title: 'Profile',
            
            tabBarIcon: ({ focused })=><Image
           
            style={
              focused?{height:20, width:20,tintColor:'orange'}:{height:20, width:20}
            }

              source={require('../image/profile.png')}
            /> }}
        />




      </Tab.Navigator>

    </NavigationContainer>

  )
}
export default TabNavigation

const styles = StyleSheet.create({})