import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from "moment/moment";


export const TradingChart = props => {
    const {
        data,
        colors: {
            backgroundColor = '#2F3E66',
            textColor = 'white',
        } = {},
    } = props;
    const chartContainerRef = useRef();
    const chart = useRef();
    const resizeObserver = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.current.applyOptions({ width: chartContainerRef.current.clientWidth });
            };
            chart.current = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                grid: {
                    vertLines: { color: '#CCD0D1', visible: false },
                    horzLines: { color: '#CCD0D1', visible: true },
                },
                height: 450,
                timeScale: {
                    timeVisible: true,
                },
                localization: {
                    locale: 'en-US',
               },
            });
            const volumeSeries = chart.current.addHistogramSeries({
                color: '#26a69a',
                priceFormat: {
                    type: 'volume',
                },
                priceScaleId: '', 
                scaleMargins: {
                    top: 0.7, 
                    bottom: 0,
                },
            });
            volumeSeries.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.7, 
                    bottom: 0,
                },
            });
            const series = chart.current.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            const histData = data.map((e) => {
                const d = moment.utc(e.date);
                return {
                  time: d.unix(),
                  value: e.volume,
                  color: e.open < e.close ? '#26a69a'  : '#ef5350',
                  open: e.open,
                  high: e.high,
                  close: e.close,
                  low: e.low,
                }
            });
            if (histData.length === 0){
                const d = new Date()
                histData.push({
                    time: Math.floor(d.getTime() / 1000),
                    open: 0,
                    high: 0,
                    low: 0,
                    close: 0,
                    value: 0
                })
            }
            if (Object.keys(props.trends).length !== 0){
            switch (props.predictMode) {
                case "day":{
                    series.createPriceLine({
                        price: props.trends.open * props.trends.predict_delta_min_1d,
                        color: '#ffcf40',
                        lineWidth: 3,
                        lineStyle: 2, // LineStyle.Dashed
                        axisLabelVisible: true,
                        title: 'min price',
                    });
                    series.createPriceLine({
                        price: props.trends.open * props.trends.predict_delta_max_1d,
                        color: '#ffcf40',
                        lineWidth: 3,
                        lineStyle: 2, // LineStyle.Dashed
                        axisLabelVisible: true,
                        title: 'max price',
                    });
                }
                    break;
                case "week": {
                series.createPriceLine({
                    price: props.trends.open * props.trends.predict_delta_min_1w,
                    color: '#ffcf40',
                    lineWidth: 3,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'min price',
                });
                series.createPriceLine({
                    price: props.trends.open * props.trends.predict_delta_max_1w,
                    color: '#ffcf40',
                    lineWidth: 3,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'max price',
                });
            }
                    break; 
                case "month": {
                    const date = moment(data[data.length - 1].date);
                    const lastPredictDate = moment(props.trends.execute_date);
                    const nextMonth = moment(lastPredictDate).add(1, "months");
                    const emptyDates = [];
                    for(date.add(1, "days"); date<nextMonth; date.add(1, "days")){
                        emptyDates.push({time: date.format('YYYY-MM-DD')})
                    }
                    const nextMonthDate = nextMonth.format('YYYY-MM-DD');
                    const line1 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const line2 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const line3 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const fp_1m = props.trends.predict_b_1m * props.trends.open;
                    const fp_high_1m = fp_1m + 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const fp_low_1m = fp_1m - 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const price_1m = props.trends.open * (props.trends["predict_b_1m"] + 130 * props.trends["predict_a_1m"])
                    const high_1m = price_1m + 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const low_1m = price_1m - 2 * fp_1m * props.trends["predict_err/b_1m"]
                    line1.setData([
                        { time: props.trends.execute_date, value: fp_high_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: high_1m},
                    ])
                    line2.setData([
                        { time: props.trends.execute_date, value: fp_low_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: low_1m },
                    ])
                    line3.setData([
                        { time: props.trends.execute_date, value: fp_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: price_1m },
                    ])

                }
                    break; 
                case "3months": {
                    const date = moment(data[data.length - 1].date);
                    const lastPredictDate = moment(props.trends.execute_date);
                    const nextMonth = moment(lastPredictDate).add(3, "months");

                    const emptyDates = [];
                    for(date.add(1, "days"); date<nextMonth; date.add(1, "days")){
                        emptyDates.push({time: date.format('YYYY-MM-DD')})
                    }
                    const nextMonthDate = nextMonth.format('YYYY-MM-DD');
                    const line1 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const line2 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const line3 = chart.current.addLineSeries(
                        {
                        color: '#ffcf40',
                        lineWidth: 3,
                    })
                    const fp_3m = props.trends.predict_b_3m * props.trends.open;
                    const fp_high_3m = fp_3m + 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const fp_low_3m = fp_3m - 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const price_3m = props.trends.open * (props.trends["predict_b_3m"] + 390 * props.trends["predict_a_3m"])
                    const high_3m = price_3m + 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const low_3m = price_3m - 2 * fp_3m * props.trends["predict_err/b_3m"]
                    line1.setData([
                        { time: props.trends.execute_date, value: fp_high_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: high_3m},
                    ])
                    line2.setData([
                        { time: props.trends.execute_date, value: fp_low_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: low_3m },
                    ])
                    line3.setData([
                        { time: props.trends.execute_date, value: fp_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: price_3m },
                    ])
                }
                    break; 
            }
        }
            series.setData(histData)
            const volumeData = data.map((e) => {
                const d = moment.utc(e.date);
                return {
                  time: d.unix(),
                  value: e.volume,
                  color: e.open < e.close ? '#26a69a'  : '#ef5350',
                  open: e.open,
                  high: e.high,
                  close: e.close,
                  low: e.low,
                }
            });
            volumeSeries.setData(volumeData)

            chart.current.timeScale().fitContent();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.current.remove();
            };
        },
        [data, props.predictMode, props.trends]
    );
    useEffect(() => {
        resizeObserver.current = new ResizeObserver((entries) => {
          const { width } = entries[0].contentRect;
          chart.current.applyOptions({ width });
          setTimeout(() => {
            chart.current.timeScale().fitContent();
          }, 0);
        });
        resizeObserver.current.observe(chartContainerRef.current);
        return () => {resizeObserver.current.disconnect();}
      }, []);

    return (
        <div
            ref={chartContainerRef}
        />
    );
};
export default TradingChart;
