// 'use strict';
// import React, { Component } from 'react';
// import styles from './index.less';
// import _ from 'i18n';
// import * as echarts from 'echarts';
// import { connect } from 'umi';

// let option;
// const xData = []
// const datas = [
//     [],
//     [],
//     []
// ]
// for (let i = 0; i < 30; i++) {
//     xData.push(i);
//     datas[0].push(Math.random() * 100);
//     datas[1].push(Math.random() * 120);
//     datas[2].push(Math.random() * 150);
// }

// option = {
//     xAxis: {
//         type: 'category',
//         data: xData,
//         show: false
//     },
//     yAxis: {
//         type: 'value',
//         show: false
//     },
//     tooltip: {
//         trigger: 'axis',
//         formatter: function (params) {
//             return 'Date: ' + params[0].name + '<br>Value: ' + params[0].data;
//         }
//     },
//     series: [{
//         data: datas[0],
//         type: 'line',
//         showSymbol: false,
//         encode: {
//             x: 'type',
//             y: 'data',
//             tooltip: ['Income']
//         },
//         lineStyle: {
//             color: '#2BB696',
//             width: 3
//         }
//     }]
// };

// @connect(({ user, loading }) => {
//     const { effects } = loading;
//     return {
//         ...user,
//     }
// })
// export default class Chart extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chart_index: 0
//         }
//     }

//     componentDidMount() {
//         const chartDom = document.getElementById('J_Chart');
//         this.myChart = echarts.init(chartDom);
//         // const { brokenLine } = this.props.pair_data;
//         // const xData = [];
//         // const data = [];
//         // brokenLine && Object.keys(brokenLine).forEach(item => {
//         //     xData.push(brokenLine[item].time);
//         //     data.push(brokenLine[item].amount);
//         // })
//         option.xAxis.data = xData;
//         option.series[0].data = datas[0];
//         option && this.myChart.setOption(option);

//     }

//     switch = (index) => {
//         option.series[0].data = datas[index];
//         this.myChart.setOption(option);
//         this.setState({
//             chart_index: index
//         })
//     }

//     render() {
//         const { chart_index } = this.state;
//         return <div className={styles.container}>
//             <div id='J_Chart' className={styles.chart}></div>
//             <div className={styles.trigger_wrap}>
//                 {['1D', '1W', '1M'].map((item, index) => (
//                     <span onClick={() => this.switch(index)} key={item} className={index === chart_index ? styles.current_trigger : styles.trigger}>{item}</span>
//                 ))}
//             </div>

//         </div>;
//     }
// }
