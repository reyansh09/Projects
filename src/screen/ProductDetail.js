import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { addWishList, getCategory, getProduct } from '../redux/action';
import { useDispatch, useSelector } from 'react-redux';



const ProductDetail = ({ navigation, route }) => {
    const routeName = getFocusedRouteNameFromRoute(route) || 'ProductDetail';
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: title });
    }, [navigation, routeName]);

    //Category Add
    const [cat, setCat] = useState([]);
   

  
    
    

    //Product-Add

    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const addToWishList = product => dispatch(addWishList(product));
    useEffect(() => {
        
        if (productReducer) {
          setData(productReducer.product.products)
        
        }
        if(categorys){
            setCat(categorys.category)
            
        }
      }, productReducer,categorys)
    const productReducer = useSelector(state => state.productReducer);
    const categorys = useSelector(state => state.productReducer)

    const fetchProduct = () => dispatch(getProduct());
    const fetachCategory = () => dispatch(getCategory());
  useEffect(() => {
    fetchProduct();
    fetachCategory();
    }, []);

    


   
    

    const available = 'In Stock'
    const { title, images, description, brand, category, price, rating, stock, warrantyInformation, shippingInformation, reviews, availabilityStatus, id ,url} = route.params;


    

    return (
        <View>
            <ScrollView>
            <View style={{flex:1}}>
                <View>
                    <View style={{ backgroundColor: '#FFFFFF' }}>
                        <Image
                            source={{ uri: images[0] }}
                            style={styles.productImage}
                            resizeMode='center'
                        />
                        <Text style={styles.titleText}>
                            {title}
                        </Text>

                        <Text style={styles.descriptionText}>
                            {description}
                        </Text>
                        <Text style={styles.priceText}>
                            $ {price}
                        </Text>
                        <View style={styles.rowContainer}>
                            <Image
                                style={styles.reviewImage}
                                source={require('../image/star-filled.png')}
                            />
                            <Image
                                style={styles.reviewImage1}
                                source={require('../image/star-filled.png')}
                            />
                            <Image
                                style={styles.reviewImage1}
                                source={require('../image/star-filled.png')}
                            />
                            <Image
                                style={styles.reviewImage1}
                                source={require('../image/star.png')}
                            />
                            <Image
                                style={styles.reviewImage1}
                                source={require('../image/star.png')}
                            />
                            <Text style={styles.textReview}>(2 Ratings)</Text>
                        </View>

                        <Text style={styles.textTaxes}>Inclusive of all texes</Text>
                    </View>
                    <View style={styles.otherProductCobntainer}>

                        <Text style={styles.commonText}>Select Size:</Text>
                        <View style={styles.rowContainer}>
                            <View style={styles.sizeBox}>
                                <Text style={styles.textBox}>
                                    Small
                                </Text>
                            </View>
                            <View style={styles.greyBox}>
                                <Text style={styles.textBoxBlack}>
                                    Medium
                                </Text>
                            </View>
                            <View style={styles.greyBox}>
                                <Text style={styles.textBoxBlack}>
                                    Large
                                </Text>
                            </View>
                        </View>

                        {/* <Text style={styles.commonText}>Brand:</Text>
                    <Text style={styles.brandText}>
                        {brand}
                    </Text> */}

                        <Text style={styles.commonText}>Select Color:</Text>

                        <View style={styles.rowContainer}>
                            <View style={styles.selectColorViewBlack}>

                            </View>
                            <View style={styles.selectColorViewWhite}>

                            </View>
                            <View style={styles.selectColorViewRed}>

                            </View>
                        </View>

                        <Text style={styles.commonText}>Quantity:</Text>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity

                            // onPress={() => handleDecreaseQuantity(item.id)}
                            >
                                <Image
                                    style={styles.minusBtn}
                                    source={require('../image/minus.png')}
                                />

                            </TouchableOpacity>
                            <Text style={styles.quantityText}>1</Text>
                            <TouchableOpacity
                            //   onPress={() => handleIncreaseQuantity(item.id)}
                            >
                                <Image
                                    style={styles.moreBtn}
                                    source={require('../image/more.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>

                        </View>
                    </View>
                </View>
                <View style={styles.similarProductContainer} >
                    <FlatList
                        horizontal={true}
                        data={data}
                        renderItem={({ item }) => {
                            const IMAGE_URL = item.images[0]
                            return (
                                <View style={styles.similarProductArea}>
                                    <View style={styles.imgeBorder}>
                                        <Image
                                            resizeMode='cover'
                                            source={{ uri: IMAGE_URL }}
                                            style={styles.similarProductImg}
                                        />
                                    </View>

                                    <Text style={styles.similarProductText}>{item.title}</Text>
                                    <Text style={styles.similarProductText}>$ {item.price}

                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
                </View>

                <View style={styles.BottomBtn}>
                        <TouchableOpacity style={styles.rowWishlist} >
                            <Image
                                style={styles.wishlistImage}
                                source={require('../image/wishlist.png')}
                            />
                            <Text style={styles.wishlistText}>  WishList</Text>
                        </TouchableOpacity>

                        <Text style={available == availabilityStatus ? (styles.availableTextGreen) : (styles.availableTextRed)}>
                            {availabilityStatus}</Text>
                    </View>
            </ScrollView>

        </View>
    )
}
export default ProductDetail

const styles = StyleSheet.create({
    rowContainer:{
        flexDirection:'row'
    },
    productImage: {
        height: 320,
        width: '90%',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: '20',
        backgroundColor: '#FFFFFF'
    },
    titleText: {
        fontSize: 20,
        padding: 10,
        color: '#000',
        fontWeight: '700',
        margin: 10

    },
    otherProductCobntainer:{
        backgroundColor: '#FFFFFF',
         marginTop: 15,
          flex: 1
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#EEEFF4',
        width: 140,
        height: 50,
        justifyContent: 'center',
        marginBottom:20,
        marginStart:20
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
    quantityText: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 10,
    },
    descriptionText: {
        fontSize: 15,
        color: '#000',
        textAlign: 'justify',
        marginLeft: 20,
        marginRight: 10

    },
    brandText: {
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
        marginRight: 10,
        fontWeight: '600',

    },
    commonText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 20,
        marginRight: 10,
        marginTop: 10,
        fontWeight: '500'
    },
    priceText: {
        fontSize: 22,
        color: '#000',
        fontWeight: '400',
        marginLeft: 20,
        marginTop: 10
    },
    textTaxes: {
        fontSize: 14,
        marginLeft: 20,
        color: 'green',
        marginBottom: 15,
        fontWeight: '600',
        marginTop: 5
    },
    shippingText: {
        fontSize: 18,
        color: '#000',
        marginLeft: 20,
        marginRight: 10,
        fontWeight: '600'
    },
    warrantyText: {
        fontSize: 15,
        color: '#000',
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 10
    },
    BottomBtn: {
        position: 'relative',
        height: 60,
        width: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        borderWidth: 0.2,
        justifyContent: 'flex-end'
    }
    , wishlistText: {
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        color: '#000'
    }
    , availableTextGreen: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'green'
    }
    , availableTextRed: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'red'
    },
    rowWishlist: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10
    }
    , wishlistImage: {
        alignSelf: 'center',
        height: 25,
        width: 25,

    },
    reviewImage: {
        height: 18,
        width: 18,
        marginEnd: 10,
        marginTop: 10,
        marginStart: 20
    },
    reviewImage1: {
        height: 18,
        width: 18,
        marginEnd: 10,
        marginTop: 10,

    },
    textReview: {
        marginTop: 10,
        fontSize: 12,
        fontWeight: '400',
        alignSelf: 'center',
        color: 'black'
    },
    sizeBox: {
        height: 55,
        width: 55,
        backgroundColor: '#FF4C3B',
        borderRadius: 10,
        marginStart: 20,
        marginTop: 10,
        justifyContent: 'center'
    }
    , textBox: {
        color: '#FFFFFF',
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: '500'

    },
    textBoxBlack: {
        color: '#000',
        alignSelf: 'center',
        fontSize: 12,
        fontWeight: '500'

    },
    greyBox: {
        height: 55,
        width: 60,
        backgroundColor: '#D3D3D3',
        borderRadius: 10,
        marginStart: 20,
        marginTop: 10,
        justifyContent: 'center'
    }
    , selectColorViewRed: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: 'red',
        marginStart: 10,
        marginTop: 10,
        marginBottom: 10,
        elevation: 4,
        borderWidth:0.2

    }
    , selectColorViewWhite: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: 'white',
        marginStart: 10,
        marginTop: 10,
        marginBottom: 10,
        elevation: 4,
        borderWidth:0.2

    }
    , selectColorViewBlack: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: 'black',
        marginStart: 20,
        marginTop: 10,
        marginBottom: 10
        , elevation: 2

    },
    similarProductImg: {
        height: 250,
        width: 200,
        margin: 10,
        marginStart: 30,


    },
    similarProductContainer: {
        backgroundColor: '#FFFFFF',
        marginTop: 15
    },
    similarProductArea: {
        padding: 10,
        alignItems: 'center'
    }
    , similarProductText: {
        fontSize: 18,
        width: 190,
        textAlign: 'justify',
        color: '#000'
    },
    imgeBorder: {
        height: 250,
        width: 200,
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 3,
        elevation: 0.4,
        alignItems: 'center',
        marginTop: 15,
        marginStart: 15
    }

})