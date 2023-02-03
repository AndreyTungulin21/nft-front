import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cancelOfferByCreator, createOffer, getOffersByTokenId } from '@src/API/offer';

export const creatingOffer = createAsyncThunk(
    'nft/creatingOffer',
    async (data, thunkApi) => {
        try {
            const response = await createOffer(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const gettingOfferByTokenId = createAsyncThunk(
    'nft/gettingOfferByTokenId',
    async (data, thunkApi) => {
        try {
            const response = await getOffersByTokenId(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const cancelingOfferByCreator = createAsyncThunk(
    'nft/cancelingOfferByCreator',
    async (data, thunkApi) => {
        try {
            const response = await cancelOfferByCreator(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

const initialState = {
    offers: [],
    isLoading: false,
}

export const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        reset: () => initialState,
        delOffer: (state, action) => {
            state.offers = state.offers.filter(value => value.offer.id !== action.payload.id)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(creatingOffer.fulfilled, (state, action) => {
                state.offers = [...state.offers, action.payload]
            })
            .addCase(gettingOfferByTokenId.fulfilled, (state, action) => {
                state.offers = [...action.payload]
            })
    }
})

export const selectOffers = (state) => state.nft.offers

export const { reset, delOffer } = nftSlice.actions
export default nftSlice.reducer
