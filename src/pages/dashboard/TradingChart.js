import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import moment from "moment/moment";


export const TradingChart = props => {
    const {
        data,
        colors: {
            backgroundColor = 'white',
            textColor = 'black',
        } = {},
    } = props;
    const chartContainerRef = useRef();

    useEffect(
        () => {
            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor,
                },
                // autoSize: true,
                height: 450,
                timeScale: {
                    timeVisible: true,
                },
            });
            let isShowMarker = false;
            const volumeSeries = chart.addHistogramSeries({
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
            const series = chart.addCandlestickSeries({
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
            switch (props.predictMode) {
                case "day":{
                    series.createPriceLine({
                        price: props.trends.open * props.trends.predict_delta_min_1d,
                        color: '#ef5350',
                        lineWidth: 2,
                        lineStyle: 2, // LineStyle.Dashed
                        axisLabelVisible: true,
                        title: 'min price',
                    });
                    series.createPriceLine({
                        price: props.trends.open * props.trends.predict_delta_max_1d,
                        color: '#26a69a',
                        lineWidth: 2,
                        lineStyle: 2, // LineStyle.Dashed
                        axisLabelVisible: true,
                        title: 'max price',
                    });
                }
                    break;
                case "week": {
                series.createPriceLine({
                    price: props.trends.open * props.trends.predict_delta_min_1w,
                    color: '#ef5350',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'min price',
                });
                series.createPriceLine({
                    price: props.trends.open * props.trends.predict_delta_max_1w,
                    color: '#26a69a',
                    lineWidth: 2,
                    lineStyle: 2, // LineStyle.Dashed
                    axisLabelVisible: true,
                    title: 'max price',
                });
                const currentDate = moment.utc(props.trends.date);
                const nextDate = moment(currentDate).add(7, "days")
                for(currentDate.add(1, "days"); currentDate<nextDate; currentDate.add(1, "days")){
                    histData.push({time: currentDate.unix()})
                }                
                isShowMarker = true
            }
                    break; 
                case "month": {
                    const date = moment(props.trends.date);
                    const nextMonth = moment(date).add(1, "months");
                    const emptyDates = [];
                    for(date.add(1, "days"); date<nextMonth; date.add(1, "days")){
                        emptyDates.push({time: date.format('YYYY-MM-DD')})
                    }
                    const nextMonthDate = nextMonth.format('YYYY-MM-DD');
                    const line1 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const line2 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const line3 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const fp_1m = props.trends.predict_b_1m * props.trends.open;
                    const fp_high_1m = fp_1m + 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const fp_low_1m = fp_1m - 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const price_1m = props.trends.open * (props.trends["predict_b_1m"] + 130 * props.trends["predict_a_1m"])
                    const high_1m = price_1m + 2 * fp_1m * props.trends["predict_err/b_1m"]
                    const low_1m = price_1m - 2 * fp_1m * props.trends["predict_err/b_1m"]
                    line1.setData([
                        { time: props.trends.date, value: fp_high_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: high_1m},
                    ])
                    line2.setData([
                        { time: props.trends.date, value: fp_low_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: low_1m },
                    ])
                    line3.setData([
                        { time: props.trends.date, value: fp_1m },
                        ...emptyDates,
                        { time: nextMonthDate, value: price_1m },
                    ])

                }
                    break; 
                case "3months": {
                    const date = moment(props.trends.date);
                    const nextMonth = moment(date).add(3, "months");
                    const emptyDates = [];
                    for(date.add(1, "days"); date<nextMonth; date.add(1, "days")){
                        emptyDates.push({time: date.format('YYYY-MM-DD')})
                    }
                    const nextMonthDate = nextMonth.format('YYYY-MM-DD');
                    const line1 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const line2 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const line3 = chart.addLineSeries(
                        {
                        color: '#2962FF',
                        lineWidth: 2,
                    })
                    const fp_3m = props.trends.predict_b_3m * props.trends.open;
                    const fp_high_3m = fp_3m + 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const fp_low_3m = fp_3m - 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const price_3m = props.trends.open * (props.trends["predict_b_3m"] + 390 * props.trends["predict_a_3m"])
                    const high_3m = price_3m + 2 * fp_3m * props.trends["predict_err/b_3m"]
                    const low_3m = price_3m - 2 * fp_3m * props.trends["predict_err/b_3m"]
                    line1.setData([
                        { time: props.trends.date, value: fp_high_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: high_3m},
                    ])
                    line2.setData([
                        { time: props.trends.date, value: fp_low_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: low_3m },
                    ])
                    line3.setData([
                        { time: props.trends.date, value: fp_3m },
                        ...emptyDates,
                        { time: nextMonthDate, value: price_3m },
                    ])
                }
                    break; 
            }
            volumeSeries.setData(histData)
            series.setData(histData)
            if (isShowMarker){
            series.setMarkers([
                {
                    time: histData[histData.length - 1].time,
                    position: 'aboveBar',
                    color: '#f68410',
                    shape: 'circle',
                    text: 'D',
                },
            ]);
        }
            // new ResizeObserver((entries) => {
            //     if (entries.length === 0 || entries[0].target !== chartContainerRef.current) { return; }
            //     const newRect = entries[0].contentRect;
            //     chart.applyOptions({ height: newRect.height, width: newRect.width });
            //   }).observe(chartContainerRef.current);

            chart.timeScale().fitContent();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            };
        },
        [data, props.predictMode]
    );
    useEffect(() => {
        console.log(1)
        setTimeout(()=>{window.dispatchEvent(new Event('resize'));}, 700)

      }, )
    return (
        <div
            ref={chartContainerRef}
        />
    );
};
export default TradingChart;
