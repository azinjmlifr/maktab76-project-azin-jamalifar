import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/http";
import axios from "axios";

const URL = "http://localhost:8000/products";

const initialState = {
  product: [],
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (name, thunkAPI) => {
    try {
      const res = await axios(URL);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something was wrong");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (product) => {
    try {
      const response = await axiosInstance.delete(`${URL}/${product}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const makeProduct = createAsyncThunk(
  "products/makeProduct",
  async (product) => {
    try {
      const response = await axiosInstance.post(URL, product);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await axiosInstance.put(`${URL}/${product.id}`, product);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // get products
    builder.addCase(getProduct.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      return { ...state, loading: false, product: action.payload };
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      return { product: [], loading: false, error: action.payload };
    });
    // update product
    builder.addCase(updateProduct.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      return { product: [], loading: false, error: action.payload };
    });
    // make new product
    builder.addCase(makeProduct.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(makeProduct.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(makeProduct.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    });
    // delete product
    builder.addCase(deleteProduct.pending, (state) => {
      return { ...state, loading: true };
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return { ...state, loading: false };
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      return { ...state, loading: false, error: action.payload };
    });
  },
});
export default productSlice.reducer;
