import axios from "axios";
export const GET_PRODUCT="GET_PRODUCT";
export const GET_CATEGORY="GET_CATEGORY";
export const ADD_TO_CART="ADD_TO_CART";
export const REMOVE_TO_WISHLIST="REMOVE_TO_WISHLIST"
export const ADD_TO_WISHLIST="ADD_TO_WISHLIST"
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';



const BASE_URL='https://dummyjson.com/products';
const CAT_URL= "https://dummyjson.com/products/categories";


export const addWishList = product => dispatch => {
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: product,
  });
};


export const removeWishList = product => dispatch => {
  dispatch({
    type: REMOVE_TO_WISHLIST,
    payload: product,
  });
};

export const addCartList = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const increaseQuantity = (id) => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = (id) => ({
  type: DECREASE_QUANTITY,
  payload: id,
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

//Category
export const getCategory = () => {
  
  try {
    
    return async dispatch => {
     
      const res = await axios.get(`${CAT_URL}`);
    //  console.log("action", res)
      if (res.data) {
        // console.log("action",res.data)
      dispatch({
          type: GET_CATEGORY,
          payload: res.data,
          
      });
      

      
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    
  }
};


//Set-Product
export const getProduct = () => {
  
    try {
      
      return async dispatch => {
       
        const res = await axios.get(`${BASE_URL}`);
        // console.log("action", res)
        if (res.data) {
          //console.log("action",res.data)
        dispatch({
            type: GET_PRODUCT,
            payload: res.data,
            
        });
        

        
        } else {
          console.log('Unable to fetch');
        }
      };
    } catch (error) {
      
    }
  };