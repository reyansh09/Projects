import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCategory } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const Category = () => {
  const dispatch = useDispatch();
  const navigation=useNavigation();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (category) {

      setCategoryList(category.category)
    }
  },category)

  const category = useSelector(state => state.productReducer)

  const fetachCategory = () => dispatch(getCategory());
  useEffect(() => {
    fetachCategory();

  }, []);
  
  return (
    <View>
    <Text style={styles.headingText}>
      Choose your Intrest
    </Text>
      <View >
        <FlatList
          
          data={categoryList}

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
fontWeight:'800'

  }
})