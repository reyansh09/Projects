import { Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screen/Home';
import Category from '../screen/Category';
import Cart from '../screen/Cart';
import WishList from '../screen/WishList';
import Profile from '../screen/Profile';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation } from '@react-navigation/native';
import ProductDetail from '../screen/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryDetail from '../screen/CategoryDetail';
import { navigationRef } from '../../App';




const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();



function HomeStackScreen() {
  return (

    <HomeStack.Navigator
   ref={navigationRef}
    >
      <HomeStack.Screen name="MultiKart" component={Home}
      screenOptions={{
        
      }}
        options={{
          
          headerRight: () => (
            <View style={{ flexDirection: 'row', padding: 10 }}>
              <TouchableOpacity
               //onPress={() => navigationRef.current?.navigate('Hotel')}
              >
                <Image
                  style={{ width: 25, height: 25, marginRight: 15 }}
                  source={require('../image/search.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
               //onPress={() => navigationRef.current?.navigate('WishList')}
              >
                <Image
                  style={{ width: 25, height: 25, marginRight: 15 }}
                  source={require('../image/notification.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
               onPress={() => useNavigation.navigate('Category')}
              >
                <Image
                  style={{ width: 25, height: 25, marginRight: 15 }}
                  source={require('../image/wishlist.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
              // onPress={() => navigationRef.current?.navigate('QuerySection')}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('../image/cart.png')}
                />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail}
       options={{
        
       }}
      />
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
      <HomeStack.Screen name="WishList" component={WishList}
      options={{
          
          headerRight: () => (
            <View style={{padding: 10}}>
              
              <TouchableOpacity
              // onPress={() => navigationRef.current?.navigate('QuerySection')}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('../image/cart.png')}
                />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <HomeStack.Screen name="ProductDetail" component={ProductDetail} />
    </HomeStack.Navigator>
  );
}
const TabNavigation = () => {

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator

        screenOptions={{
          tabBarStyle: { height: 70, padding: 10 },
          tabBarActiveTintColor: '#FF4C3B',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: { fontSize: 16, paddingBottom: 10, paddingTop: 10 }



        }}
      >
        <Tab.Screen
          name="HomeStackScreen"
          component={HomeStackScreen}
          options={({ route }) => ({
            headerShown: false,
            title: 'Home',
            tabBarStyle: ((route) => {
               
              const routeName = getFocusedRouteNameFromRoute(route) 
              console.log(routeName)

              if (routeName === 'ProductDetail') {
                return { display: "none"}
              }
              return 
            })(route),
            tabBarIcon: ({ focused }) => <Image
              style={
                focused ? { height: 30, width: 30, tintColor: '#FF4C3B' } : { height: 30, width: 30 }
              }
              source={
                focused ? require('../image/home1.png') : require('../image/home.png')
              }
            />
          })

          }
        />
        <Tab.Screen name="CategoryStackScreen"
          component={CategoryStackScreen}
          options={{
            headerShown: false,
            title: 'Category',

            tabBarIcon: ({ focused }) => <Image
              style={
                focused ? { height: 30, width: 30, tintColor: '#FF4C3B' } : { height: 30, width: 30 }
              }
              source={
                focused ? require('../image/category.png') : require('../image/category1.png')}
            />
          }}
        />
        <Tab.Screen name="Cart" component={Cart}
          options={{
            title: 'Cart',
            headerRight: () => (
            <View style={{padding: 10}}>
              
              <TouchableOpacity
               //onPress={() => navigationRef.current?.navigate('WishListStackScreen')}
              >
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require('../image/wishlist.png')}
                />
              </TouchableOpacity>
            </View>
          ),
          headerTitle:'Shopping Cart',

            tabBarIcon: ({ focused }) => <Image
              style={
                focused ? { height: 30, width: 30, tintColor: '#FF4C3B' } : { height: 30, width: 30 }
              }
              source={
                focused ? require('../image/cart1.png') : require('../image/cart.png')}
            />
          }}
        />
        <Tab.Screen name="WishListStackScreen"
          component={WishListStackScreen}
          options={{
            headerShown: false,
            title: 'WishList',
            tabBarIcon: ({ focused }) => <Image
              style={
                focused ? { height: 30, width: 30, tintColor: '#FF4C3B' } : { height: 30, width: 30 }
              }
              source={
                focused ? require('../image/wishlist1.png') : require('../image/wishlist.png')}
            />
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => <Image
              style={
                focused ? { height: 30, width: 30, tintColor: '#FF4C3B' } : { height: 30, width: 30 }
              }
              source={
                focused ? require('../image/profile1.png') : require('../image/profile.png')}
            />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default TabNavigation

