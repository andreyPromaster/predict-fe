import { useState, useEffect } from 'react';
import {
    Grid,
    Link,
    Typography,
} from '@mui/material';
import PredictTable from './PredictTable';
import MainCard from 'components/MainCard';
import { fetchTopWeeklyForecast } from '../../api/Tickers'
import { FileAddOutlined } from '@ant-design/icons';
import { TOP_WEEKLY_PREDIT_URL_EXCEL } from '../../api/Urls'
import { useSelector, useDispatch } from 'react-redux';
import { tickerTopDealsUploaded } from '../../store/reducers/ticker'

const Deals = () => {
    const dispatch = useDispatch()
    const predicts = useSelector((state) => state.ticker.topDeals)

    useEffect(() => {
        if (predicts.length === 0) {
            fetchTopWeeklyForecast().then((response) => {
                dispatch(tickerTopDealsUploaded(response.data))
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [])

    return (
        <Grid container columnSpacing={2.75}>
            <Grid item container alignItems="center" justifyContent="space-between">
                <Grid item lg={9}>
                    <Typography variant="h5">The top of weekly predicts</Typography>
                </Grid>
                <Grid item lg={3}>
                    {predicts.length !== 0 && <Typography variant="h5">Updated: {predicts[0].start_date}</Typography>}
                </Grid>
            </Grid>

            <Grid item>
                <Grid container alignItems="center" justifyContent="space-between">
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <PredictTable predicts={predicts} />
                    </MainCard>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <Link href={TOP_WEEKLY_PREDIT_URL_EXCEL}>
                    <Typography variant="h5"><FileAddOutlined color="success" /> Download the top of weekly predicts</Typography>
                </Link>
            </Grid>
        </Grid>
    );
};

export default Deals;
