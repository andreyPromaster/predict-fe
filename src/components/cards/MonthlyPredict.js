import { Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import MonthsPredictBar from '../../pages/dashboard/MonthsPredictBar';


const MonthlyPredictCard = () => (
    <MainCard sx={{minHeight: '220px'}} contentSX={{ p: 1}}>
      <Stack spacing={0.5}>
        <Typography variant="h6" color="textSecondary">
          1 month / 3 month predicts
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
          <MonthsPredictBar/>
          </Grid>
        </Grid>
        </Stack>
        </MainCard>

    );
export default MonthlyPredictCard;
