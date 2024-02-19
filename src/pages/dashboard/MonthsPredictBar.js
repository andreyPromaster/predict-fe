import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const columnChartOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '60%',
    }
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
    categories: ['0', '1', '2', '3', '4', '5', '6', '7']
  },
  fill: {
    opacity: 1
  },
};


const MonthsPredictBar = () => {
  const data = useSelector((state) => state.ticker.trendsForecasts)

  const theme = useTheme();
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const charSuccess = theme.palette.success.light;
  const [options, setOptions] = useState(columnChartOptions);
  const series = [];
  if (Object.keys(data).length !== 0){
    series.push({
      name: 'Monthly predict',
      data: [
        data.predict_interval_cat_expected_1m_0.toFixed(2), data.predict_interval_cat_expected_1m_1.toFixed(2),
        data.predict_interval_cat_expected_1m_2.toFixed(2), data.predict_interval_cat_expected_1m_3.toFixed(2),
        data.predict_interval_cat_expected_1m_4.toFixed(2), data.predict_interval_cat_expected_1m_5.toFixed(2),
        data.predict_interval_cat_expected_1m_6.toFixed(2), data.predict_interval_cat_expected_1m_7.toFixed(2),
      ]
    })
    series.push({
      name: 'Three monthly predict',
      data: [
        data.predict_interval_cat_expected_3m_0.toFixed(2), data.predict_interval_cat_expected_3m_1.toFixed(2),
        data.predict_interval_cat_expected_3m_2.toFixed(2), data.predict_interval_cat_expected_3m_3.toFixed(2),
        data.predict_interval_cat_expected_3m_4.toFixed(2), data.predict_interval_cat_expected_3m_5.toFixed(2),
        data.predict_interval_cat_expected_3m_6.toFixed(2), data.predict_interval_cat_expected_3m_7.toFixed(2),
      ]
    })
  }
  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [charSuccess, '#4375ff'],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
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
          bottom: -12,
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
  }, [primary, secondary, line]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar"  height={150} />
    </div>
  );
};

export default MonthsPredictBar;