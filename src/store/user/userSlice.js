import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { connectUser, updateUser } from '@src/API/user'

export const connecterUser = createAsyncThunk(
    'user/connectUser',
    async (data, thunkApi) => {
        try {
            const response = await connectUser(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

export const updaterUser = createAsyncThunk(
    'user/updateUser',
    async (data, thunkApi) => {
        try {
            const response = await updateUser(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err.response.data)
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (data, thunkApi) => {
        try {
            const response = await getUserInfo(data)
            return response
        } catch (err) {
            return thunkApi.rejectWithValue(err)
        }
    }
);

const initialState = {
    account: {},
    wallet: '',
    statusWallet: '',
    isLoading: false,
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWallet: (state, action) => { state.wallet = action.payload },
        setWalletStatus: (state, action) => { state.statusWallet = action.payload },
        reset: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(connecterUser.fulfilled, (state, action) => {
                state.account = action.payload
                state.isAuth = true
            })
            .addCase(updaterUser.fulfilled, (state, action) => {
                state.account = action.payload
            })
    }
})


export const selectAccount = (state) => state.user.account
export const selectIsAuth = (state) => state.user.isAuth

export const { setWallet, reset, setWalletStatus } = userSlice.actions
export default userSlice.reducer
