// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    candlesticks: [],
    trendsForecasts: {},
    categoricalForecasts: {},
    profile: {},
    topDeals: []
};

const ticker = createSlice({
  name: 'ticker',
  initialState,
  reducers: {
    tickerDataUploaded(state, action){
        state.candlesticks = action.payload.candlesticks
        state.trendsForecasts = action.payload.trendsForecasts
        state.categoricalForecasts = action.payload.categoricalForecasts
        state.profile = action.payload.profile
    },
    tickerTopDealsUploaded(state, action){
        state.topDeals = action.payload
    },
    tickerCandlesticksUploaded(state, action){
        state.candlesticks = action.payload
    },
    predictsUploaded(state, action){
        state.trendsForecasts = action.payload.trendsForecasts
        state.categoricalForecasts = action.payload.categoricalForecasts
    },
}}
);

export default ticker.reducer;

export const { tickerDataUploaded, tickerTopDealsUploaded, tickerCandlesticksUploaded, predictsUploaded } = ticker.actions;
