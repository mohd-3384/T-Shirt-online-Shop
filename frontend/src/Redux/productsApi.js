// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// Get all Products
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://t-shirt-online-shop.onrender.com/' }), // http://localhost:5000/
    endpoints: (builder) => ({
        getproductsByName: builder.query({
            query: (name) => `products`,
        }),
    }),
})


// Get One Product
export const oneproductApi = createApi({
    reducerPath: 'oneproductApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://t-shirt-online-shop.onrender.com/' }), // http://localhost:5000/
    endpoints: (builder) => ({
        getOneProduct: builder.query({
            query: (name) => `products/${name}`,
        }),
    }),
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsByNameQuery } = productsApi
export const { useGetOneProductQuery } = oneproductApi