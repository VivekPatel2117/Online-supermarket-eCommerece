import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    item:[]
}
const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const {productId,quantity} = action.payload;
            const indexProductId = (state.item).findIndex(item=>item.productId === productId)
            if(indexProductId >= 0){
                state.item[indexProductId].quantity += quantity
            }else{
                state.item.push({productId,quantity});
            }

        },
        removeFromCart(state,action){
            const {productId,quantity} = action.payload;
            const indexProductId = (state.item).findIndex(item=>item.productId === productId)
            if(indexProductId >=0){
                state.item[indexProductId].quantity -= quantity
            }else{
                state.item.splice(indexProductId, 1);
            }
        }
    }
})
export const {addToCart,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;