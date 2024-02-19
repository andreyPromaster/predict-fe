import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import WeeklyPredictBar from '../../pages/dashboard/WeeklyPredictBar';


const WeeklyPredictCard = () => (
    <MainCard sx={{minHeight: '220px'}} contentSX={{ p: 1}}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          Weekly predicts
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
          <WeeklyPredictBar />
          </Grid>
        </Grid>
        </Stack>
        </MainCard>

    );
export default WeeklyPredictCard;
