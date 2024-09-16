import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCategories } from '../redux/prdouctSlice';


const Category = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();


 

  const category = useSelector(state => state.products.categories)

  const fetachCategory = () => dispatch(fetchCategories());
  useEffect(() => {
    fetchCategories();

  }, []);
  
  return (
    <View style={{backgroundColor:'#FFFFFF'}}>
    <Text style={styles.headingText}>
      Choose your Intrest
    </Text>
      <View >
        <FlatList
          
          data={category}

          renderItem={({ item }) => <TouchableOpacity
style={styles.catBox}
            onPress={() => navigation.navigate('CategoryDetail', item)}
          >
            <Text style={styles.catText}>{item.name}</Text>
          </TouchableOpacity>}
        />
      </View>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
catText:{
    padding:10,
    fontSize:20,
    textAlign:'center',
    color:'white'

  },
  catBox:{
    width:"95%",
    height:60,
    borderRadius:10,
    borderColor:'black',
    alignSelf:'center',
    
    margin:10,
    backgroundColor:'orange'

  },
  headingText:{
fontSize:22,
margin:10,
fontWeight:'800',
color:'#000'

  }
})