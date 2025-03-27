
import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
   name: "loaders",
   initialState: {
    loading: false,
   },
   reducers: {
    ShowLoading: (state) => {
        console.log('Loading');
        state.loading = true;
    },
    HideLoading: (state) => {
        state.loading = false;
    }
   }
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
