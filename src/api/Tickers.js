import {TIKERS_URL, TOP_WEEKLY_PREDIT_URL} from "./Urls"
import axios from "axios";

const client = axios.create();


export const fetchTrendsForecast = (symbol) => {
    return client.get(`${TIKERS_URL}/${symbol}/trends-forecast`)
};

export const fetchCategoricalForecast = (symbol) => {
    return client.get(`${TIKERS_URL}/${symbol}/categorical-forecast`)
};

export const fetchTopWeeklyForecast = (isFile) => {
    const fileParam = {}
    if (isFile) {
        fileParam.format = 'excel'
    }
    return client.get(TOP_WEEKLY_PREDIT_URL, { params: fileParam })
};

export const fetchGraphData = (symbol, filters) => {
    return client.get(`${TIKERS_URL}/${symbol}`, { params: filters })
}

export const fetchTickerProfile = (symbol) => {
    return client.get(`${TIKERS_URL}/${symbol}/profile`)
}

export const fetchTickerData = (symbol, filters={}) => {
    return Promise.all([fetchGraphData(symbol, filters), fetchTickerProfile(symbol), fetchTrendsForecast(symbol), fetchCategoricalForecast(symbol)])
}