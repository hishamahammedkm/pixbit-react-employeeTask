import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api";

const initialState = {
  designations: [],
  selectedDesignations: [],
  employees: [],
  loading: false,
  success:false,
  error: null,
  employeesLoading: false,
};

export const getDesignations = createAsyncThunk(
  "employee/getDesignations",
  async () => {
    try {
      console.log("getDesignations");
      const response = await API.get("/designations");
      return response.data;
      console.log(response.data);
    } catch (error) {
      // console.log(error);
      throw Error(error);
    }
  }
);

export const addDesignation = createAsyncThunk(
  "employee/addDesignation",
  async (designation) => {
    try {
      const response = await API.post("/designations", designation);
      return response.data;
    } catch (error) {
      // console.log(error);
      throw Error(error);
    }
  }
);

export const deleteDesignation = createAsyncThunk(
  "employee/deleteDesignation",
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

export const editDesignation = createAsyncThunk(
  "employee/editDesignation",
  async ({ id, designation_name }) => {
    try {
      const response = await API.put(`designations/${id}`, {
        designation_name: designation_name,
      });
      return response.data;
      console.log("ressssssssssss", response.data);
    } catch (error) {
      console.log("eeeeee", error);
      throw Error(error);
    }
  }
);

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async () => {
    try {
      const response = await API.get("/employees");

      return response.data;
    } catch (error) {
      console.log("eeeeee", error);
      throw Error(error);
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (formData) => {
    try {
      const response = await API.post("/employees", formData);
      return response.data;
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (id) => {
    try {
      const response = await API.delete(`employees/${id}`);
      return response.data;
    } catch (error) {
      // console.log(error);
      throw Error(error);
    }
  }
);


export const editEmployee = createAsyncThunk(
    "employee/editEmployee",
    async ({id,object}) => {
        console.log('putttt',id,object);
      try {
        const response = await API.put(`employees/${id}`,  
            object,    );
        return response.data;
        
      } catch (error) {
       
        throw Error(error);
      }
    }
  );



const emploeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    selectDesignation(state, action) {
      console.log("action", action.payload);
      state.selectedDesignations = action.payload;
    },
    setStatus(state,action){
      state.success = action.payload
    }
  },
  extraReducers: {
    [addDesignation.fulfilled]: (state, action) => {
      state.success = true
      state.loading = false;
    },
    [getDesignations.fulfilled]: (state, action) => {
      state.loading = false;
      state.designations = action.payload.data;
    },
    [editDesignation.pending]: (state, action) => {
      state.loading = true;
    },
    [editDesignation.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [editDesignation.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteDesignation.pending]: (state, action) => {
      state.loading = true;
    },
    [getEmployees.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteDesignation.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteDesignation.rejected]: (state, action) => {
      state.loading = false;
    },
    // [getEmployees.pending]: (state, action) => {
    //   state.employeesLoading = true;
    // },

    [getEmployees.fulfilled]: (state, action) => {
    //   state.employeesLoading = false;
      state.employees = action.payload.data;
    },
    [deleteEmployee.pending]: (state, action) => {
      state.employeesLoading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.employeesLoading = false;
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.employeesLoading = false;
    },
  },
});
export const { selectDesignation,setStatus } = emploeeSlice.actions;
export default emploeeSlice.reducer;
