import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';
const CAT_URL = 'https://dummyjson.com/products/categories';
const SEARCH_URL = 'https://dummyjson.com/products/search?q=phone';

// Thunks for asynchronous actions (fetching data)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(BASE_URL);
  return response.data.products;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get(CAT_URL);
  return response.data;
});

export const searchProduct = createAsyncThunk('products/searchProduct', async () => {
  const response = await axios.get(SEARCH_URL);
  return response.data.products;
});

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
    wishList: [],
    items: [],
    selectedSize: 'small',
    search: [],
    loading: false,
    error: null,
  },

  reducers: {
    addToWishList: (state, action) => {
      state.wishList.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(item => item.id !== action.payload.id);
    },
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    setSize: (state, action) => {
      state.selectedSize = action.payload;
      // console.log(action.payload,"hey")
    },
  },


  extraReducers: (builder) => {
    // Handle fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        // console.log("Hello",action.payload )
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle search products
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.search = action.payload;
      });
  },
});

// Export actions
export const {
  addToWishList,
  removeFromWishList,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setSize,
} = productSlice.actions;

// Export reducer
export default productSlice.reducer;
