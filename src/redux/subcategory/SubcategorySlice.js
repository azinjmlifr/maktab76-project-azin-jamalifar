import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:1000/subcategory";

const initialState = {
  subcategory: [],
};

export const getSubcategory = createAsyncThunk(
  "category/getSubcategory",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something was wrong");
    }
  }
);

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSubcategory.fulfilled, (state, action) => {
      state.subcategory = action.payload;
    });
  },
});
export default subcategorySlice.reducer;
