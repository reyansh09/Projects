// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './reducer';


// const options  = {
//   reducer: {
//     productReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true,
//     immutableCheck: false,
//     serializableCheck: false,
//   })

//   }
// export const store = configureStore(options);


import { configureStore } from "@reduxjs/toolkit";
import prdouctSlice from "./prdouctSlice";


 
export const store =configureStore({
  
  reducer:{
    products:prdouctSlice    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    }),
    
})

