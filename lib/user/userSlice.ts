import Userinterface from "@/interfaces/Userinterface";
import {createSlice} from "@reduxjs/toolkit";

const initialState: Userinterface = {
    theme: 'light'
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        changeMode: (state: Userinterface) => {
            if (state.theme =='light'){
                state.theme = 'dark'
            }else{
                state.theme = "light"
            }
        }
    }
})

export const {changeMode} = userSlice.actions
export default userSlice.reducer