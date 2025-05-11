import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { DriversState, FetchDriversResponse } from '../../types/types';

const initialState: DriversState = {
  list: [],
  loading: false,
  error: null,
  offset: 0,
  total: 0,
};

export const fetchDrivers = createAsyncThunk<
  FetchDriversResponse,
  number,
  { rejectValue: string }
>('drivers/fetchDrivers', async (offset, { rejectWithValue }) => {
  try {
    const response = await api.get(`drivers.json?limit=30&offset=${offset}`);
    const data = response.data.MRData.DriverTable.Drivers;
    const total = parseInt(response.data.MRData.total, 10);
    return { drivers: data, total };
  } catch (error: unknown) {
    return rejectWithValue('Error loading data');
  }
});

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    resetDrivers(state) {
      state.list = [];
      state.offset = 0;
      state.total = 0;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDrivers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload.drivers];
        state.total = action.payload.total;
        state.offset = state.list.length;
      })

      .addCase(fetchDrivers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDrivers } = driversSlice.actions;
export const driversReducer = driversSlice.reducer;
