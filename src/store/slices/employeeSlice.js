import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  API  from '../api';

const initialState = {
   
    designations:[],
    selectedDesignations:[],
    loading: false,
    error: null,
}


export const getDesignations = createAsyncThunk(
    'employee/getDesignations',
    async () => {
        try {
            const response = await API.get('/designations');
            return response.data;
            console.log(response.data);
        } catch (error) {
            // console.log(error);
            throw Error(error);
        }
    }
);



export const addDesignation = createAsyncThunk(
    'employee/addDesignation',
    async (designation) => {
        try {
            const response = await API.post('/designations',designation);
            return response.data;
        } catch (error) {
            // console.log(error);
            throw Error(error);
        }
    }
);


export const deleteDesignation = createAsyncThunk(
    'employee/deleteDesignation',
    async (id) => {
        try {
            const response = await API.delete(`designations/${id}`);
            return response.data;
        } catch (error) {
            // console.log(error);
            throw Error(error);
        }
    }
);


const emploeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers:{
        selectDesignation(state, action) {
            console.log('action',action.payload);
            state.selectedDesignations = action.payload
        },
    },
    extraReducers:{
        [addDesignation.fulfilled]: (state, action) => {
            
            state.loading = false;
        },
        [getDesignations.fulfilled]: (state, action) => {
            
            state.loading = false;
            state.designations = action.payload.data
        },
    }
})
export const {selectDesignation} = emploeeSlice.actions
export default emploeeSlice.reducer;

