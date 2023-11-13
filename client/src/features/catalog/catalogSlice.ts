import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

export const fetchProducts = createAsyncThunk<Product[]>(
    'catalog/fetchProducts',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchProduct = createAsyncThunk<Product, number>(
    'catalog/fetchProduct',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            console.log(action.payload);
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProduct.pending, (state, action) => {
            console.log(action.payload);
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProduct.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProduct.rejected, (state, action) => {
            console.log(action.payload);
            state.status = 'idle';
        });
    })
});

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);