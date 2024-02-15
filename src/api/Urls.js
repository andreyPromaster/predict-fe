let host = ""

if (process.env.REACT_APP_BASE_URL){
    host = process.env.REACT_APP_BASE_URL
}
export const TIKERS_URL = `${host}/api/v1/tickers`;
export const TOP_WEEKLY_PREDIT_URL = `${host}/api/v1/tickers/top-weekly-forecasts`;
export const TOP_WEEKLY_PREDIT_URL_EXCEL = `${host}/api/v1/tickers/top-weekly-forecasts?format=excel`;
