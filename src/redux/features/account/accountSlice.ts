import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  accountCard: {
    category: string;
    description: string;
    name: string;
    price: string;
  };
  accountCredentials: {
    id: string;
    username: string;
    email: string;
    password: string;
    preview?: string;
    additionalEmail?: string;
    additionalPassword?: string;
    additionalDescription?: string;
  }[];
}

// Define the initial state using that type
const initialState: IInitialState = {
  accountCard: {
    category: "",
    description: "",
    name: "",
    price: "",
  },
  accountCredentials: [],
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountCard: (state, action: PayloadAction<any>) => {
      state.accountCard = action.payload;
    },
    setAccountCredentials: (state, action: PayloadAction<any>) => {
      state.accountCredentials.push(action.payload);
    },
    deleteAccountCredentials: (state, action: PayloadAction<any>) => {
      state.accountCredentials = state.accountCredentials.filter(
        (item) => item.id !== action.payload
      );
    },
    emptyAccountCredentials: (state) => {
      state.accountCredentials = [];
    },
  },
});

export const {
  setAccountCard,
  setAccountCredentials,
  deleteAccountCredentials,
  emptyAccountCredentials,
} = accountSlice.actions;

export default accountSlice.reducer;
