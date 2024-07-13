import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../Types/users.types";
// import { dummyUser } from "../../../dummyData";

interface AuthState {
  user?: User;
}

const currentUser = localStorage.getItem("user");
const user = currentUser ? (JSON.parse(currentUser) as User) : undefined;

const initialState: AuthState = {
  user,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem("user");
      location.reload();
      return initialState;
    },
    setLogedInUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setLogedInUser } = authSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;
