import { configureStore } from '@reduxjs/toolkit'
import collectionSlice from './collection/collectionSlice'
import infoSlice from './info/infoSlice'
import nftSlice from './nft/nftSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    collection: collectionSlice,
    nft: nftSlice,
    defaultVariable: infoSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const TypeRootState = store.getState()