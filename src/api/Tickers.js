import { TIKERS_URL, TOP_WEEKLY_PREDIT_URL } from "./Urls"
import axios from "axios";

const client = axios.create();


export const fetchTrendsForecast = (symbol, date) => {
    if (typeof date === 'undefined') {
        return client.get(`${TIKERS_URL}/${symbol}/trends-forecast`)
    } else {
        return client.get(`${TIKERS_URL}/${symbol}/trends-forecast`, { params: { predicted_for: date } })
    }
};

export const fetchCategoricalForecast = (symbol, date) => {
    if (typeof date === 'undefined') {
        return client.get(`${TIKERS_URL}/${symbol}/categorical-forecast`)
    } else {
        return client.get(`${TIKERS_URL}/${symbol}/categorical-forecast`, { params: { predicted_for: date } })
    }
};

export const fetchTopWeeklyForecast = (predictedFor) => {
    const params = {}
    if (typeof predictedFor !== "undefined") {
        params.predicted_for = predictedFor
    }
    return client.get(TOP_WEEKLY_PREDIT_URL, { params: params })
};

export const fetchGraphData = (symbol, filters) => {
    return client.get(`${TIKERS_URL}/${symbol}`, { params: filters })
}

export const fetchTickerProfile = (symbol) => {
    return client.get(`${TIKERS_URL}/${symbol}/profile`)
}

export const fetchTickerData = (symbol, filters = {}) => {
    return Promise.all([fetchGraphData(symbol, filters), fetchTickerProfile(symbol), fetchTrendsForecast(symbol), fetchCategoricalForecast(symbol)])
}

export const fetchTickerPredicts = (symbol, date) => {
    return Promise.all([ fetchTrendsForecast(symbol, date), fetchCategoricalForecast(symbol, date)])
}