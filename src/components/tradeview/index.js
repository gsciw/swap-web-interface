// src/components/TradingViewChart.js
import React, { useEffect, useRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import candelData from './candleData.json';

const TradingViewChart = () => {
    const chartContainerRef = useRef(null);
    let chart;

    useEffect(() => {
        chart = createChart(chartContainerRef.current, {
            width: 520,
            height: 300,
            //autoSize: true,
            layout: {
                backgroundColor: '#FFFFFF',
                textColor: 'rgba(33, 56, 77, 1)',
            },
            grid: {
                vertLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
                horzLines: {
                    color: 'rgba(197, 203, 206, 0.5)',
                },
            },
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            priceScale: {
                borderColor: 'rgba(197, 203, 206, 1)',
            },
            timeScale: {
                borderColor: 'rgba(197, 203, 206, 1)',
            },
            localization: {
                locale: 'en-US',
                //dateFormat: 'yyyy/MM/dd', // adjust
            },
        });

        const upColor = '#0ECB81' // green
        const downColor = '#F6465D' // red

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: upColor,
            downColor: downColor,
            borderDownColor: downColor,
            borderUpColor: upColor,
            wickDownColor: downColor,
            wickUpColor: upColor,
        });

        //TODO: You can fetch the data from an API or use a static dataset
        /*fetch('YOUR_API_URL') // Replace with your data source or API endpoint
            .then(res => res.json())
            .then(data => {
                // Map your data to the format required by the library
                const chartData = data.map(item => ({
                    time: item.date, // e.g., "2020-04-01"
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                }));
                candlestickSeries.setData(chartData);
            });*/

        candlestickSeries.setData(candelData);
        //chart.priceScale().applyOptions({
        //  autoScale: false,
        //  minValue: 0.00000001,
        //  maxValue: 1.0,
        //  precision: 8
        //});

        chart.timeScale().fitContent();

        // Cleanup the effect to avoid memory leaks when the component is unmounted
        return () => chart.remove();

    }, []);

    return <div ref={chartContainerRef} style={{ width: '400px', height: '300px' }}></div>;
};

export default TradingViewChart;
