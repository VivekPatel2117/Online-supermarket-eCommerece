import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem('carts')) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, price } = action.payload;
      const indexProductId = state.item.findIndex(item => item.productId === productId);
      if (indexProductId >= 0) {
        state.item[indexProductId].quantity += quantity;
        // Update the price if needed, or you can keep the same price if it doesn't change
        state.item[indexProductId].price = price;
        localStorage.setItem('carts',JSON.stringify(state.item))
      } else {
        state.item.push({ productId, quantity, price });
        localStorage.setItem('carts',JSON.stringify(state.item))
      }
    },
    removeFromCart(state, action) {
      const { productId, quantity } = action.payload;
      const indexProductId = state.item.findIndex(item => item.productId === productId);
      if (indexProductId >= 0) {
        state.item[indexProductId].quantity -= quantity;
        localStorage.setItem('carts',JSON.stringify(state.item))
        if (state.item[indexProductId].quantity <= 0) {
          state.item.splice(indexProductId, 1); // Remove when quantity is 0
          localStorage.setItem('carts',JSON.stringify(state.item))
        }
      }
    },
    removeProductFromCart(state, action) {
      const { productId } = action.payload;
      const index = state.item.findIndex(cartItem => cartItem.productId === productId);
      if (index >= 0) {
        state.item.splice(index, 1); // Remove the product from the cart
        localStorage.setItem('carts',JSON.stringify(state.item))
      }
    },
    vaccantCart(state,action){
      state.item.length = 0;
      localStorage.removeItem('carts');
    },
  }
});

export const { addToCart, removeFromCart, removeProductFromCart, vaccantCart } = cartSlice.actions;
export default cartSlice.reducer;
