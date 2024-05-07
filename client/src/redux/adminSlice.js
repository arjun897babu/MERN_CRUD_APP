import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAdminAuth: false,
  adminDetails: {}
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminLogin: (state, action) => {
      state.isAdminAuth = true;
      state.adminDetails = action.payload;
    },
    setAdminLogout: (state) => {
      state.isAdminAuth = false;
      state.adminDetails = {};
    }
  },
});

export const { setAdminLogin, setAdminLogout } = adminSlice.actions;
export default adminSlice.reducer;