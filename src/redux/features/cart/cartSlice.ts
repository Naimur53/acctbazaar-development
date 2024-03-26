 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState { 
}

// Define the initial state using that type
const initialState: IInitialState = {
 
};

export const cartSlice = createSlice({
  name: "cart",
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<any>) => { 

    },
   
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
