import {configureStore} from '@reduxjs/toolkit'
import authReducer from './adminSlice.js'

const store = configureStore({
    reducer: {
        admin: authReducer
        // other reducers
    }
})
export default store;