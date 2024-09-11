// import React, { useEffect, useState } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { CustomFlatList } from '../customComponent/CustomFlatList'
// import { useNavigation } from '@react-navigation/native';
// import { addWishList, getProduct, removeWishList } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux';

// const Profile = (props) => {
//   const{ list,renderItem}=props
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [data, setData] = useState([])
//   const [cat, setCat] = useState([]);
 


 
//   const addToWishList = product => dispatch(addWishList(product));
//   const removeToWishList = product => dispatch(removeWishList(product));
//   const handleAddToWishList = product => {

//     addToWishList(product);
//     //console.log('add', product.id)
//   };
//   const handleRemoveToWishList = product => {
//     removeToWishList(product);
//     //console.log('remove', product)
//   };

//   useEffect(() => {
//     if (productReducer) {
//       setData(productReducer.product.products)
//       console.log(data)
//     }
//     if (category) {
//       setCat(category.category)
//     }
//   }, productReducer, category)

//   const productReducer = useSelector(state => state.productReducer);
//   const category = useSelector(state => state.productReducer)
//   const wishList = useSelector(state => state.productReducer)
//   const exists = product => {
//     //console.log(product);
//     if (wishList.wishList.filter(item => item.id === product.id).length > 0) {
//       return true;
//     }
//     return false;
//   };
//   const fetchProduct = () => dispatch(getProduct());
//   const fetachCategory = () => dispatch(getCategor
//     ());
//   useEffect(() => {
//     fetchProduct();
//     fetachCategory();

//   }, []);
  
//   return (
//     <View>
//       <CustomFlatList
//         list={props.data}
//         renderItem={({item})=>{
//           return(<View>
//             <Text>{item.title}</Text>
//           </View>)
//         }}

//       />
      
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text  style={styles.text}>Profile</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    color:'#FFF',
    justifyContent:'center',
    alignItems:'center'  
  },
  text:{
    fontSize:20,
    color:'#000',
    fontWeight:'bold'
  }  
})