import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUserAuth: null,
  isAdminAuth: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState, 
  reducers: {
    setUserLogin: (state, action) => {
      state.isUserAuth = true;
    },
    setUserLogout: (state) => {
      state.isUserAuth = false;
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
