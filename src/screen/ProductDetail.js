import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addCartList } from '../redux/action';


const ProductDetail = ({ route }) => {
    const { title, images, description, brand, category, price, rating, stock, warrantyInformation, shippingInformation, reviews, availabilityStatus,id } = route.params;
    

    return (

        <View>
            <Image
                source={{ uri: images[0] }}
                style={styles.productImage}
                resizeMode='center'
            />
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Title: </Text>{title}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Description: </Text>{description}
            </Text>

            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Brand: </Text>{brand}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Category: </Text>{category}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Price: </Text>{price}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Warranty-Information: </Text>{warrantyInformation}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Shipping-Information: </Text>{shippingInformation}
            </Text>
            <Text style={styles.descriptionText}>
                <Text style={styles.allText}
                >Availability-Status: </Text>{availabilityStatus}
            </Text>



            <FlatList
                horizontal={true}

                data={reviews}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.commentSection}>
                            <View style={{ flexDirection: 'row', textAlign: 'center' }}>
                                <Text style={styles.commentName}>
                                    {item.reviewerName}
                                </Text>
                                <Text style={styles.commentText}>
                                    {item.reviewerEmail}
                                </Text>
                            </View>

                            <Text style={{ marginTop: 5 }}>
                                {item.comment}
                            </Text>
                            <Text
                                style={{ fontSize: 10 }}
                            >
                                {item.date}
                            </Text>
                        </View>
                    )
                }}
            />
            <TouchableOpacity
                style={styles.addtoCartBtn}
                // onPress={handleAddToCart}
            >
                <Text
                    style={styles.textBtn}>
                    Add to Cart
                </Text>

            </TouchableOpacity>
        </View>

    )
}

export default ProductDetail

const styles = StyleSheet.create({
    productImage: {
        height: 250,
        width: '90%',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: '20',
        backgroundColor: '#EEEFF4'
    },
    descriptionText: {
        fontSize: 15,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        textAlign: 'justify',

    },
    commentSection: {
        padding: 10,
        borderWidth: 0.3,
        borderColor: 'black',
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: '#EEEFF9',
        marginRight: 30

    }
    , commentText: {
        fontSize: 12,


    }
    , commentName: {
        fontSize: 16,
        marginRight: 25
    },
    addtoCartBtn: {
        padding: 10,
        width: '90%',
        height: 45,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#8E7BFA',
        alignSelf: 'center',
        alignItems: 'center'


    },
    textBtn: {
        fontSize: 16,
        color: 'white'
    }
    , allText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400'
    }

})