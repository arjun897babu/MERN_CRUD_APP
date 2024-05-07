import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuth: null,
  isAdminAuth: null,
  userDetails:{}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setUserLogin: (state, action) => {
      state.isUserAuth = true;
      state.userDetails = action.payload
    },
    setUserLogout: (state) => {
      state.isUserAuth = false;
      state.userDetails = {}
    },
    setAdminLogin: (state, action) => {
      state.isAdminAuth = true;
    },
    setAdminLogout: (state) => {
      state.isAdminAuth = false;
    }, 
  },
});

export const { setUserLogin, setUserLogout, setAdminLogin, setAdminLogout } = authSlice.actions;

export default authSlice.reducer;
