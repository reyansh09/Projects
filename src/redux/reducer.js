import { ADD_TO_CART, ADD_TO_WISHLIST, CLEAR_CART, DECREASE_QUANTITY, GET_CATEGORY, GET_PRODUCT, INCREASE_QUANTITY, INCREMENT_QUANTITY, PROFILE, REMOVE_TO_CART, REMOVE_TO_WISHLIST, SET_SIZE } from "./action";


const initialState = {
    product: [],
    category: [],
    wishList: [],
    items: [],
    selectedSize:'small'

};

function productReducer(state = initialState, action) {

    switch (action.type) {

        case GET_PRODUCT:
            // console.log("reducer",action.payload)
            return {
                ...state,
                product: action.payload,
            };
        case GET_CATEGORY:
            //console.log("reducer",action.payload)
            return {
                ...state,
                category: action.payload,
            };
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishList: [...state.wishList, action.payload]
            };
        case REMOVE_TO_WISHLIST:
            return {
                ...state,
                wishList: state.wishList.filter(
                    product => product.id !== action.payload.id)
            };
        case ADD_TO_CART:
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                const updatedItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, items: updatedItems };
            } else {
                return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }
            case REMOVE_TO_CART:
                return{
                    ...state,
                    items: state.items.filter(item=>item.id !== action.payload.id)
                };

        case INCREASE_QUANTITY:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case DECREASE_QUANTITY:
            return {
                ...state,
                items: state.items
                    .map(item =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                            : item
                    )
                    .filter(item => item.quantity > 0),
            };

        case CLEAR_CART:
            return {
                ...state,
                items: []
            };
        case SET_SIZE:
            return {
                ...state,
                selectedSize: action.payload,
            };
        default:
            return state;

    }

}

export default productReducer;