import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '20%',
    }
  },
  tooltip:{
    enabled: true,
    theme:'dark'
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 20,
    colors: ['transparent']
  },
  xaxis: {
    categories: [">10%", "5-10%", "2-5%", "1-2%", "0-1%", "0-1%+", "1-2%+", "2-5%+", "5-10%+", ">10%+"],
  },
  fill: {
    opacity: 1
  },
};

// ==============================|| SALES COLUMN CHART ||============================== //

const WeeklyPredictBar = () => {
  const weeklyPredicts = useSelector((state) => state.ticker.categoricalForecasts)
  const theme = useTheme();
  const barsColors = { upColor: '#26a69a', downColor: '#ef5350' }
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const series = [];
  if (Object.keys(weeklyPredicts).length !== 0){
    series.push({
      name: 'Weekly predicts',
      data: [
        weeklyPredicts.w_low_10.toFixed(2), weeklyPredicts.w_low_5_10.toFixed(2),
        weeklyPredicts.w_low_2_5.toFixed(2), weeklyPredicts.w_low_1_2.toFixed(2),
        weeklyPredicts.w_low_0_1.toFixed(2), weeklyPredicts.w_high_0_1.toFixed(2),
        weeklyPredicts.w_high_1_2.toFixed(2), weeklyPredicts.w_high_2_5.toFixed(2),
        weeklyPredicts.w_high_5_10.toFixed(2), weeklyPredicts.w_high_10.toFixed(2),
      ]
    })
  }
  const [options, setOptions] = useState(columnChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [
        ({ value, seriesIndex, dataPointIndex, w }) => {
          if (dataPointIndex < 5) {
            return barsColors.downColor;
          } 
          return barsColors.upColor;
        }
      ],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary,secondary,secondary, secondary]
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line,
        padding: {
          right: 5,
          bottom: -23,
      },  
      },
      tooltip: {
        theme:'dark'
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500'
        }
      }
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar"  height={150} />
    </div>
  );
};

export default WeeklyPredictBar;
