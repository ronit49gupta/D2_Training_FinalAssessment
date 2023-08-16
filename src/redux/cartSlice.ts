import { createSlice } from "@reduxjs/toolkit";
import { ICartState } from "../utils";

// Initial state for cart state
const initialState : ICartState  = {
    items : [],
    totalQuantity : 0,
}

const cartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        // Add to cart method
        addToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.items.find((item) =>item.id === newItem.id);
            state.totalQuantity++;
            if(!existingItem){
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quanity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quanity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            } 
        },
        // remove from cart method
        removeFromCart(state, action){
            const selectedItem = action.payload;
            const existingItem = state.items.find((item) => item.id === selectedItem.id);
            
            state.totalQuantity--;
            if(existingItem!.quanity === 1){
                state.items = state.items.filter(item => item.id !== selectedItem.id);
            } else {
                existingItem!.quanity--;
                existingItem!.totalPrice = existingItem!.totalPrice - existingItem!.price;
            }
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;