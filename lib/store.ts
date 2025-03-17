import {combineReducers} from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'

import {persistReducer} from 'redux-persist'
import {default as localstorage} from 'redux-persist/lib/storage'
// import storage from 'redux-persist/lib/storage/session'

// Local Storage
const localReducers = combineReducers({
    user: userReducer
})
const persistenciaLocal = {
    key: 'root',
    storage: localstorage
}

const localStoragePersistedReducer = persistReducer(persistenciaLocal, localReducers)

// Session Storage
// const reducers = combineReducers({
//     usuarios: usuarioReducer
// })

// const persistencia = {
//     key: 'root',
//     storage
// }
// const persistedReducer = persistReducer(persistencia, reducers);


// Geral Reducers
const rootReducer = combineReducers({
    'local': localStoragePersistedReducer,
    // 'session': persistedReducer,

})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']