import { useState, useEffect } from 'react';
import { fetchTickerData, fetchGraphData, fetchTickerPredicts } from "api/Tickers"
// material-ui
import {
  List, ListItem, ListItemText,
  Button,
  Grid,
  Chip,
  MenuItem,
  TextField,
  Typography,
  Link,
  Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';

import { tickerCandlesticksUploaded, tickerDataUploaded, predictsUploaded } from '../../store/reducers/ticker'
// project import
import MainCard from 'components/MainCard';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';
import TradingChart from './TradingChart'
import WeeklyPredictCard from '../../components/cards/WeeklyPredict'
import MonthlyPredictCard from '../../components/cards/MonthlyPredict'
import Notification from './Notification';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const timeframes = [
  {
    value: '1min',
    label: '1min'
  },
  {
    value: '15min',
    label: '15min'
  },
  {
    value: '30min',
    label: '30min'
  },
  {
    value: '1h',
    label: '1h'
  },
  {
    value: '4h',
    label: '4h'
  },
  {
    value: '1d',
    label: '1d'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const dispatch = useDispatch()

  const [slot, setSlot] = useState('day');
  const [timeframe, setTimeframe] = useState('1d');
  const [ticker, setTicker] = useState("");
  const [predictDate, setPredictDate] = useState(dayjs());
  const [errorMessage, setErrorMessage] = useState('');

  const profile = useSelector((state) => state.ticker.profile)
  const trendsForecasts = useSelector((state) => state.ticker.trendsForecasts)
  const candlesticks = useSelector((state) => state.ticker.candlesticks)

  const onTimeframeChanged = (timeframe) => {
    setTimeframe(timeframe);
    let tickerQuery = trendsForecasts.symbol || ticker
    if (!tickerQuery) {
      return
    }
    const filters = {}
    if (timeframe !== '1min') {
      filters.timeframe = timeframe
    }
    fetchGraphData(tickerQuery.toUpperCase(), filters).then((response) => {
      dispatch(tickerCandlesticksUploaded(response.data))
    }).catch((error) => {
      console.log(error);
    })
  }

  const onTickerCompleted = (event, symbol) => {
    if (event.key === 'Enter' || event.type === "click") {
      event.preventDefault();
      const filters = {}
      if (timeframe !== '1min') {
        filters.timeframe = timeframe
      }
      fetchTickerData(symbol.trim().toUpperCase(), filters).then(([{ data: candlesticks }, { data: profile }, { data: trendsForecasts }, { data: categoricalForecasts }]) => {
        const payload = { candlesticks, profile, trendsForecasts, categoricalForecasts }
        dispatch(tickerDataUploaded(payload))
        setTicker(symbol.trim().toUpperCase())
        setPredictDate(trendsForecasts.date)
      }).catch((error) => {
        console.log(error)
        if (error?.response?.status === 404) {
          setErrorMessage(error?.response.data.detail)
        }
        else {
          setErrorMessage("Unknown error")
        }
      })
    }
  };

  const onPredictDateChanged = (date) => {
    if (ticker.length === 0) return;

    fetchTickerPredicts(ticker, date.format('YYYY-MM-DD')).then(([{ data: trendsForecasts }, { data: categoricalForecasts }]) => {
      const payload = { trendsForecasts, categoricalForecasts }
      dispatch(predictsUploaded(payload))
      setPredictDate(trendsForecasts.date)
    }).catch((error) => {
      console.log(error)
      if (error?.response?.status === 404) {
        setErrorMessage(`${ticker} - ${date.format('YYYY-MM-DD')} ${error?.response.data.detail}`)
      }
      else {
        setErrorMessage("Unknown error")
      }
      setPredictDate(date.format('YYYY-MM-DD'))
    })
  }
  useEffect(
    () => {
      setPredictDate(trendsForecasts.date)
    }, [predictDate])

  return (
    <>
      <Grid container rowSpacing={2.5} columnSpacing={2.75}>
        <Notification message={errorMessage} />
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard {profile.companyName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Search onTickerCompleted={onTickerCompleted}></Search>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} >
          <WeeklyPredictCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4} >
          <MonthlyPredictCard />
        </Grid>
        {Object.keys(profile).length === 0 ?
          <Grid item md={4} lg={4} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} />
          :
          <Grid item xs={12} md={4} lg={4} >
            <MainCard sx={{ minHeight: '220px' }} contentSX={{ p: 2 }}>
              <List disablePadding={true} dense={false}>
                <ListItem disablePadding={true}>
                  <ListItemText
                    primary={`Exchange:   ${profile.exchange}`}
                  />
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText
                    primary={`Industry:   ${profile.industry}`}
                  />
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText
                    primary={`Sector:   ${profile.sector}`}
                  />
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText
                    primary={`Country:   ${profile.country}`}
                  />
                </ListItem>
                <ListItem disablePadding={true}>
                  <ListItemText
                    primary={`IPO date:   ${profile.ipoDate}`}
                  />
                </ListItem>
                <ListItem disablePadding={true}>
                  <Link href={`https://www.sec.gov/edgar/browse/?CIK=${parseInt(profile.cik)}`} color="inherit" rel="noreferrer" underline="always" target="_blank">
                    CIK EDGAR
                  </Link>
                  <Link sx={{ ml: 1 }} href={profile.website} color="inherit" rel="noreferrer" target="_blank" underline="always">
                    Company website
                  </Link>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        }

        <Grid item xs={12}>
          <Grid container  rowSpacing={1} columnSpacing={3}  >
            <Grid item>
              <Chip label="Timeframe:" sx={{ mr: 1 }} />
              <TextField
                id="standard-select-timeframe"
                size="small"
                select
                value={timeframe}
                onChange={(e) => { e.preventDefault(); onTimeframeChanged(e.target.value) }}
                sx={{
                  mr: 1, boxShadow: 'none', '& .MuiInputBase-input': { py: 0.68, fontSize: '0.875rem', },
                }}
              >
                {timeframes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item>
              <Chip label="Predict prediod:" sx={{ mr: 1 }} />
              <Button
                size="small"
                onClick={(event) => { event.preventDefault(); setSlot('day'); }}
                color={slot === 'day' ? 'selectedPredict' : 'defaultPredict'}
                variant={slot === 'day' ? 'outlined' : 'text'}
              >
                Day
              </Button>
              <Button
                size="small"
                onClick={(event) => { event.preventDefault(); setSlot('week') }}
                color={slot === 'week' ? 'selectedPredict' : 'defaultPredict'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
              <Button
                size="small"
                onClick={(event) => { event.preventDefault(); setSlot('month') }}
                color={slot === 'month' ? 'selectedPredict' : 'defaultPredict'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={(event) => { event.preventDefault(); setSlot('3months') }}
                color={slot === '3months' ? 'selectedPredict' : 'defaultPredict'}
                variant={slot === '3months' ? 'outlined' : 'text'}
              >
                3 Months
              </Button>
            </Grid>
            <Grid item>
              <Chip label="Predicted for:" sx={{ mr: 1 }} />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  sx={{
                    mr: 1, boxShadow: 'none', '& .MuiInputBase-input': { py: 0.68, fontSize: '0.875rem', },
                  }}
                  value={dayjs(predictDate)}
                  onChange={(value) => onPredictDateChanged(value)}
                />
              </LocalizationProvider>
            </Grid>

          </Grid>
          <MainCard content={false} sx={{ mt: 1.5, minHeight: '450px' }}>
            <Box sx={{ pt: 1, pr: 2, }}>
              <TradingChart data={candlesticks} predictMode={slot} trends={trendsForecasts}></TradingChart>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardDefault;
