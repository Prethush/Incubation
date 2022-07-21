import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import slotService from "./slotService";

const initialState = {
  slots: [],
  isError: false,
  isSuccess: false,
  isMessage: false,
};

// get all slots
export const getAllSlots = createAsyncThunk(
  "user/allslots",
  async (_, thunkAPI) => {
    try {
      return await slotService.getAllSlots();
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// book slot
export const bookSlot = createAsyncThunk(
  "user/book-slot",
  async (data, thunkAPI) => {
    try {
      return await slotService.bookSlot(data);
    } catch (err) {
      const message =
        (err.response && err.reponse.data && err.reponse.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    reset: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSlots.pending, (state, action) => {
        state.slots = [];
        state.isError = false;
        state.isSuccess = false;
        state.isMessage = "";
      })
      .addCase(getAllSlots.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "";
      })
      .addCase(getAllSlots.rejected, (state, action) => {
        state.slots = [];
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      })
      .addCase(bookSlot.pending, (state, action) => {
        state.slots = [];
        state.isError = false;
        state.isSuccess = false;
        state.isMessage = "";
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.isError = false;
        state.isSuccess = true;
        state.isMessage = "";
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.slots = [];
        state.isError = true;
        state.isSuccess = false;
        state.isMessage = action.payload;
      });
  },
});

export const { reset } = slotSlice.actions;
export default slotSlice.reducer;
