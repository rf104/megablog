import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData;
        },


        ///in logout we don't neeed any action payload thats why we are not expecting it 
        logout: (state)=>{
            state.status = false;
            state.userData = null;
        },
    }
})


export const {login,logout} = authSlice.actions;

export default authSlice.reducer;