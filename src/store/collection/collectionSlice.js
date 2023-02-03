import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyCollections, updateCollection, addCollection, deleteCollection } from '@src/API/collection'

export const myCollectionsUser = createAsyncThunk(
    'collection/getMyCollections',
    async (data, thunkApi) => {
        try {
            const response = await getMyCollections(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const updaterCollection = createAsyncThunk(
    'collection/updateCollection',
    async (data, thunkApi) => {
        try {
            const response = await updateCollection(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data)
        }
    }
);

export const addingCollection = createAsyncThunk(
    'collection/addCollection',
    async (data, thunkApi) => {
        try {
            const response = await addCollection(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);


const initialState = {
    collections: [],
    isLoading: false
}

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        reset: () => initialState,
        delCollection: (state, action) => {
            state.collections = state.collections.filter(value => value.id !== action.payload.id)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(myCollectionsUser.pending, (state) => {
                // state.isLoading = true
            })
            .addCase(myCollectionsUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.collections = [...state.collections, ...action.payload.data]
            })
            .addCase(myCollectionsUser.rejected, (state, action) => {
                state.isLoading = false
            })
    }
})


export const selectCollections = (state) => state.collection.collections
export const selectIsLoading = (state) => state.collection.isLoading

export const { reset, delCollection } = collectionSlice.actions
export default collectionSlice.reducer
