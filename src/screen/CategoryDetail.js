import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const CategoryDetail = ({ route }) => {
  const { name, url } = route.params;
  const navigation = useNavigation();
  const [typCat, setTypCat] = useState([]);

  const getCatData = async () => {
    const type = url;
    let result = await fetch(type);
    result = await result.json();
    setTypCat(result.products);

    //console.log(result.products)
  };

  useEffect(() => {
    getCatData()
  }, [])

//  console.log(slug)
  return (
    <View>
      <Text
        style={styles.headingText}>
        {name}
      </Text>
      <FlatList
        data={typCat}
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
                <Text style={styles.availabilityStatus}>
                  {item.availabilityStatus}
                </Text>
              </View>
            </TouchableOpacity>
          )
        }
        }
      />
    </View>


  )
}

export default CategoryDetail

const styles = StyleSheet.create({
  catText: {
    fontSize: 20,
    padding: 10,
    fontWeight: '500',
    color: 'black',
    borderColor: 'black',
    borderWidth: 1,
    marginStart: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5

  },
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
  },

  headingText: {
    fontSize: 22,
    margin: 10,
    fontWeight: '800'

  }
})