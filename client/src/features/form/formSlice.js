import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formService from "./formService";

const initialState = {
  form: "",
  isError: false,
  isSuccess: false,
  forms: "",
};

// create form
export const createForm = createAsyncThunk(
  "user/crete-form",
  async (data, thunkAPI) => {
    try {
      console.log(data, "data");
      return await formService.createForm(data);
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get forms
export const getForms = createAsyncThunk(
  "user/get-forms",
  async (_, thunkAPI) => {
    try {
      return await formService.getForms();
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// change to pending state
export const toPendingState = createAsyncThunk(
  "user/to-pending",
  async (id, thunkAPI) => {
    try {
      console.log(id, "id");
      return await formService.pendingState(id);
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// change to approved state
export const toApprovedState = createAsyncThunk(
  "user/to-approved",
  async (id, thunkAPI) => {
    try {
      console.log(id, "id");
      return await formService.approvedState(id);
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// change to declined state
export const toDeclinedState = createAsyncThunk(
  "user/to-declined",
  async (id, thunkAPI) => {
    try {
      console.log(id, "id");
      return await formService.declinedState(id);
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    reset: (state) => {
      state.form = "";
      state.isError = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createForm.pending, (state, action) => {
        state.form = null;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createForm.fulfilled, (state, action) => {
        state.form = action.payload;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(createForm.rejected, (state, action) => {
        state.form = null;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getForms.fulfilled, (state, action) => {
        state.form = null;
        state.isError = false;
        state.isSuccess = true;
        state.forms = action.payload;
      })
      .addCase(toPendingState.fulfilled, (state, action) => {
        state.form = null;
        state.isError = false;
        state.isSuccess = true;
        state.forms = action.payload;
      })
      .addCase(toApprovedState.fulfilled, (state, action) => {
        state.form = null;
        state.isError = false;
        state.isSuccess = true;
        state.forms = action.payload;
      })
      .addCase(toDeclinedState.fulfilled, (state, action) => {
        state.form = null;
        state.isError = false;
        state.isSuccess = true;
        state.forms = action.payload;
      });
  },
});

export default formSlice.reducer;
export const { reset } = formSlice.actions;
