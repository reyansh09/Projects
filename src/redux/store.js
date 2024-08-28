import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducer';
import { serializer } from '../../metro.config';



const options  = {
  reducer: {
    productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true,
    immutableCheck: false,
    serializableCheck: false,
  })

  }
export const store = configureStore(options);

