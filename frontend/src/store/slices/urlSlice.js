import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createShortUrl } from '../../apis/createShortUrl';

const initialState = {
  shortUrl: '',
  originalUrl: '',
  loading: false,
  error: null,
};

export const shortenUrl = createAsyncThunk(
  'url/shorten',
  async (url, { rejectWithValue }) => {
    try {
      const response = await createShortUrl(url);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create short URL');
    }
  }
);

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    clearUrl: (state) => {
      state.shortUrl = '';
      state.originalUrl = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrl = action.payload;
        state.error = null;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearUrl } = urlSlice.actions;
export default urlSlice.reducer;