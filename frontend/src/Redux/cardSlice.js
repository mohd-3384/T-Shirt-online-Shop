import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // localStorage.getItem
    selectedProducts: localStorage.getItem("selectedProducts") ? JSON.parse(localStorage.getItem("selectedProducts")) : [],
    selectedProductsID: localStorage.getItem("selectedProductsID") ? JSON.parse(localStorage.getItem("selectedProductsID")) : []
}

export const cardSlice = createSlice({
    name: 'Warenkorb',
    initialState,
    reducers: {
        // in den Warenkorb hinzufügen
        addToCart: (state, action) => {
            const productQuantity = { ...action.payload, "quantity": 1 }
            state.selectedProducts.push(productQuantity)
            state.selectedProductsID.push(action.payload.id)
            // localStorage.setItem
            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
            localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
        },



        // Produktmenge erhöhen
        increaseQuantity: (state, action) => {
            const increasedProduct = state.selectedProducts.find((item) => {
                return item.id === action.payload.id
            })
            increasedProduct.quantity += 1
            // localStorage.setItem
            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
        },



        // Produktmenge minimieren
        decreaseQuantity: (state, action) => {
            const decreasedProduct = state.selectedProducts.find((item) => {
                return item.id === action.payload.id
            })
            decreasedProduct.quantity -= 1

            // das gewählte Produkt löschen
            if (decreasedProduct.quantity === 0) {
                const newArr = state.selectedProducts.filter((item) => {
                    return item.id !== action.payload.id
                })

                const newArrID = state.selectedProductsID.filter((item) => {
                    return item !== action.payload.id
                })
                // localStorage.setItem
                state.selectedProducts = newArr
                state.selectedProductsID = newArrID
                localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
            }
            // localStorage.setItem
            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
        },



        // Produkt vom Warenkorb löschen
        deleteProduct: (state, action) => {
            const newArr = state.selectedProducts.filter((item) => {
                return item.id !== action.payload.id
            })

            const newArr2 = state.selectedProductsID.filter((item) => {
                return item !== action.payload.id
            })

            state.selectedProducts = newArr
            state.selectedProductsID = newArr2
            // localStorage.setItem
            localStorage.setItem("selectedProducts", JSON.stringify(state.selectedProducts))
            localStorage.setItem("selectedProductsID", JSON.stringify(state.selectedProductsID))
        },
    },
})

export const { addToCart, increaseQuantity, decreaseQuantity, deleteProduct } = cardSlice.actions

export default cardSlice.reducer