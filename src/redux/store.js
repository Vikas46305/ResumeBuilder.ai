import ResumeSlice from './slice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, ResumeSlice)
export const ResumeStore = configureStore({
    reducer: {
        data: persistedReducer,
    }

})
export const persistor = persistStore(ResumeStore)