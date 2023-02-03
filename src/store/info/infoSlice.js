import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mainInfo: {},
    isOpenSidebar: false,
    filterProfile: {},
    barSwitchGrid: '',
}


export const infoSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        toogleSidebar: state => { state.isOpenSidebar = !state.isOpenSidebar },
        setFilterProfile: (state, action) => { state.filterProfile = { ...state.filterProfile, ...action.payload } },
        setBarSwitchGrid: (state, action) => { state.barSwitchGrid = action.payload },
        setMainInfo: (state, action) => { state.mainInfo = action.payload },
    },
})

export const selectBarSwitchGrid = (state) => state.defaultVariable.barSwitchGrid
export const selectMainInfo = (state) => state.defaultVariable.mainInfo
export const selectFilterProfile = (state) => state.defaultVariable.filterProfile


export const { toogleSidebar, setFilterProfile, setMainInfo, setVoidSigner, setBarSwitchGrid } = infoSlice.actions
export default infoSlice.reducer