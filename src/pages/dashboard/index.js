import { useState } from 'react';
import { fetchTickerData, fetchGraphData } from "api/Tickers"
// material-ui
import {
  Breadcrumbs,
  Button,
  Grid,
  Chip,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Link,
  Box
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {tickerCandlesticksUploaded, tickerDataUploaded} from '../../store/reducers/ticker'
// project import
import MainCard from 'components/MainCard';
import Search from '../../layout/MainLayout/Header/HeaderContent/Search';
import TradingChart from './TradingChart'
import WeeklyPredictCard from '../../components/cards/WeeklyPredict'
import MonthlyPredictCard from '../../components/cards/MonthlyPredict'
import Notification from './Notification';

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
  const [errorMessage, setErrorMessage] = useState('');

  const isOpen = useSelector((state) => state.menu.drawerOpen)
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
        const payload = {candlesticks, profile, trendsForecasts, categoricalForecasts}
        dispatch(tickerDataUploaded(payload))
        setTicker(symbol)
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

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Notification message={errorMessage} />
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard {profile.companyName}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Search onTickerCompleted={onTickerCompleted}></Search>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <WeeklyPredictCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} >
          <MonthlyPredictCard />
        </Grid>
        <Grid item md={4} lg={6} sx={{ display: { sm: 'none', md: 'block', lg: 'block' } }} />
        <Grid item xs={11} >
          {Object.keys(profile).length !== 0 &&
            <Breadcrumbs sx={{ mb:1, color: 'text.secondary' }} aria-label="breadcrumb">
              <Typography variant="h6">Exchange: {profile.exchange}</Typography>
              <Typography variant="h6">Industry: {profile.industry}</Typography>
              <Typography variant="h6">Sector: {profile.sector}</Typography>
              <Typography variant="h6">Country: {profile.country}</Typography>
              <Typography variant="h6">IPO date: {profile.ipoDate}</Typography>
              <Link href={`https://www.sec.gov/edgar/browse/?CIK=${parseInt(profile.cik)}`} rel="noreferrer" target="_blank" underline="hover">
                CIK number
              </Link>
              <Link href={profile.website} rel="noreferrer" target="_blank" underline="hover">
                Company website
              </Link>
            </Breadcrumbs>}
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0} useFlexGap flexWrap="wrap">
              <Chip label="Timeframe:"   sx={{ mr: 1}} />
                <TextField
                  id="standard-select-timeframe"
                  size="small"
                  select
                  value={timeframe}
                  onChange={(e) => onTimeframeChanged(e.target.value)}
                  sx={{ mr: 1, '& .MuiInputBase-input': { py: 0.68, fontSize: '0.875rem' } }}
                >
                  {timeframes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Chip label="Predict prediod:" sx={{ mr: 1}} />
                <Button
                  size="small"
                  onClick={() => setSlot('day')}
                  color={slot === 'day' ? 'primary' : 'secondary'}
                  variant={slot === 'day' ? 'outlined' : 'text'}
                >
                  Day
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('week')}
                  color={slot === 'week' ? 'primary' : 'secondary'}
                  variant={slot === 'week' ? 'outlined' : 'text'}
                >
                  Week
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('month')}
                  color={slot === 'month' ? 'primary' : 'secondary'}
                  variant={slot === 'month' ? 'outlined' : 'text'}
                >
                  Month
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot('3months')}
                  color={slot === '3months' ? 'primary' : 'secondary'}
                  variant={slot === '3months' ? 'outlined' : 'text'}
                >
                  3 Months
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <Box sx={{ pt: 1, pr: 2,}}>
            <TradingChart data={candlesticks} predictMode={slot} trends={trendsForecasts} timeframe={timeframe} isOpen={isOpen}></TradingChart>
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={1}  sx={{ display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }} />

      </Grid>
    </>
  );
};

export default DashboardDefault;
