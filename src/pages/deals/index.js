import { useState, useEffect } from 'react';
import {
    Grid,
    Link,
    Chip,
    Typography,
} from '@mui/material';
import PredictTable from './PredictTable';
import MainCard from 'components/MainCard';
import { fetchTopWeeklyForecast } from '../../api/Tickers'
import { FileAddOutlined } from '@ant-design/icons';
import { TOP_WEEKLY_PREDIT_URL_EXCEL } from '../../api/Urls'
import { useSelector, useDispatch } from 'react-redux';
import { tickerTopDealsUploaded } from '../../store/reducers/ticker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const Deals = () => {
    const dispatch = useDispatch()
    const predicts = useSelector((state) => state.ticker.topDeals)
    const [predictDate, setPredictDate] = useState(dayjs());

    useEffect(() => {
        if (predicts.length === 0) {
            fetchTopWeeklyForecast().then((response) => {
                dispatch(tickerTopDealsUploaded(response.data))
                setPredictDate(dayjs(response.data[0].forecast_timestamp).format('YYYY-MM-DD'))
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [])

    const onPredictDateChanged = (date) => {
        fetchTopWeeklyForecast(date.format('YYYY-MM-DD')).then((response) => {
            dispatch(tickerTopDealsUploaded(response.data))
            setPredictDate(dayjs(response.data[0].forecast_timestamp).format('YYYY-MM-DD'))
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(
        () => {
            if (predicts.length !== 0) {
                setPredictDate(dayjs(predicts[0].forecast_timestamp).format('YYYY-MM-DD'))
            }
        }, [predictDate])
    return (
        <Grid container columnSpacing={2.75}>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item xs={12}>
                    <Typography variant="h5">The top of weekly predicts </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Chip label="Predicted for:" sx={{ mr: 1 }} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            format={"DD-MM-YYYY"}
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

            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <PredictTable predicts={predicts} />
                    </MainCard>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <Link href={`${TOP_WEEKLY_PREDIT_URL_EXCEL}&predicted_for=${predictDate}`}>
                    <Typography variant="h5"><FileAddOutlined color="success" /> Download the top of weekly predicts</Typography>
                </Link>
            </Grid>
        </Grid>
    );
};

export default Deals;
