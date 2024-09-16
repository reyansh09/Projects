import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { searchProduct } from "../redux/prdouctSlice";


const Search = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState(SProduct)

    const [selectedProduct, setSelectedProduct] = useState('Select Country')
    const [isClicked, setIsClicked] = useState(false)
   
    const searchRef = useRef();
    const onSearch = txt => {
      if (txt != '') {
        let tempData = data.filter(item => {
          return item.country.toLowerCase().indexOf(txt.toLowerCase()) > -1;
  
        })
        setData(tempData);
      }
      else {
        setData(SProduct.product.title);
      }
  
    }
   
    useEffect(() => {
        if (SProduct) {
         onSearch()
       }
},[])
const SProduct = useSelector(state => state.productReducer);
    

    const fetahSeachItem = () => dispatch(searchProduct());
    useEffect(() => {
        fetahSeachItem()
  
    }, []);



  return (
    <View
      style={styles.container}>
      <Text
        style={styles.heading}>
        Country Drop Down
      </Text>
      <TouchableOpacity
        style={styles.dropdownSelector} onPress={() => {
          setIsClicked(!isClicked);
        }}>
        <Text>
          {selectedProduct}
        </Text>
        {/* {
          isClicked ? (
            <Image style={styles.icon} source={require('./assets/up-arrow.png')} />
          ) : (
            <Image style={styles.icon} source={require('./assets/down.png')} />
          )
        } */}

      </TouchableOpacity>
      {
        isClicked ? (
          <View style={styles.dropdownArea}>
            <TextInput
              ref={searchRef}
              placeholder="Search"
              style={styles.searchInput}
              onChangeText={txt => {
                onSearch(txt)
              }}
            />
            <FlatList
              data={data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={styles.countryItem} onPress={() => {
                    setSelectedCountry(item.country);
                    onSearch('')
                    setIsClicked(false);
                    searchRef.current.clear()
                  }}>
                    <Text>{item.country}</Text>
                  </TouchableOpacity>
                )
              }}
            />

          </View>
        ) : null
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    marginTop: 100,
    alignSelf: 'center'
  },
  dropdownSelector: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  }
  , icon: {
    height: 20,
    width: 20
  },
  dropdownArea: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    alignSelf: 'center',
    elevation: 5
  }
  , searchInput: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20
  },
  countryItem: {
    width: '85%',
    height: 50,
    borderBottomWidth: 0.2,
    borderBlockColor: '#8e8e8e',
    alignSelf: 'center',
    justifyContent: 'center'
  }

})

export default Search;