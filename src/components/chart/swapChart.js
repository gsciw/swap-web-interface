'use strict';
import { COLOR1, COLOR2 } from 'common/const';
import ChartTitle from './title';
import styles from './index.less';
import _ from 'i18n';
import CandlestickChart from 'components/tradeview';

const type = 'swap';
export default function SwapChart(props) {
  const { symbol1, symbol2, abandoned } = props;
  const unit = symbol2 === 'USDT' ? 'usdt' : 'satoshi(0.00000001 space)';
  return (
    <div className={styles.chart_container}>
      <ChartTitle
        type={type}
        symbol1={symbol1}
        symbol2={symbol2}
        abandoned={abandoned}
      />
      <div className={styles.data_info}>
        <div>
          <span className={styles.dot} style={{ backgroundColor: COLOR1 }} />{' '}
          {unit}
        </div>
      </div>
      <div className={styles.candlestick_chart}>
        <CandlestickChart symbol1={symbol1} symbol2={symbol2} />
      </div>
    </div>
  );
}
