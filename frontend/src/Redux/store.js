import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { oneproductApi, productsApi } from './productsApi'
import cartReducer from './cardSlice'


export const store = configureStore({
    reducer: {
        cartt: cartReducer, // cartt ==> wird in useSelector in Cart.jsx benötigt
        [productsApi.reducerPath]: productsApi.reducer,
        [oneproductApi.reducerPath]: oneproductApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware).concat(oneproductApi.middleware),
})

setupListeners(store.dispatch)