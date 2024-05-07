import { createSlice } from '@reduxjs/toolkit';

// initial state for the authentication part
const initialState = {
  isUserAuth: null,
  userDetails: {}  // bbject to store user details
};

export const authSlice = createSlice(
  {
    name: 'auth',
    initialState,
    reducers: {
      //   set user login status and details
      setUserLogin: (state, action) => {
        state.isUserAuth = true;
        state.userDetails = action.payload
      },
      //reset user state upon logout
      setUserLogout: (state) => {
        state.isUserAuth = false;
        state.userDetails = {}
      }
    },
  }
);

export const { setUserLogin, setUserLogout } = authSlice.actions;

export default authSlice.reducer;
