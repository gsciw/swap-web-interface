'use strict';
import React, { Component } from 'react';
import { jc } from 'common/utils';
import CustomIcon from 'components/icon';
import TokenLogo from 'components/tokenicon';
import styles from './index.less';
import _ from 'i18n';
import { Button, Form, InputNumber, message, Spin } from 'antd';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import SelectToken from '../selectToken';
import Setting from '../setting';
import { connect } from 'umi';
// import Volt from 'lib/volt';
import Loading from 'components/loading';
import BigNumber from 'bignumber.js';
import { slippage_data, feeRate, FEE_FACTOR } from 'common/config';
import EventBus from 'common/eventBus';
import { formatAmount, formatSat } from 'common/utils';
import debug from 'debug';
const log = debug('swap');
// import bsv from 'lib/webWallet';

const { storage_name, defaultIndex, datas } = slippage_data;

const FormItem = Form.Item;

const menu = [
  {
    key: 'market',
    label: _('market'),
  },
  // {
  //     key: 'limit',
  //     label: _('limit'),
  // }
];

@connect(({ user, pair, loading }) => {
  const { effects } = loading;
  return {
    ...user,
    ...pair,
    loading: effects['pair/getAllPairs'] || effects['pair/getPairData'],
    submiting:
      effects['pair/reqSwap'] ||
      effects['pair/swap'] ||
      effects['user/transferBsv'] ||
      effects['user/transferFtTres'] ||
      false,
  };
})
export default class Swap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'form',
      formFinish: false,
      showDetail: true,
      origin_amount: 0,
      aim_amount: 0,
      slip: 0,
      fee: 0,
      txFee: 0,
      lastMod: '',
      dirForward: true, //交易对方向，true正向 false反向
      // bsvToToken: true,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    EventBus.on('reloadPair', this.fetch);
    this.fetch();
  }

  fetch = async () => {
    const { dispatch } = this.props;
    await dispatch({
      type: 'pair/getAllPairs',
    });

    let { currentPair } = this.props;
    log('currentPair:', currentPair);
    if (currentPair) {
      await dispatch({
        type: 'pair/getPairData',
        payload: {
          currentPair,
        },
      });
    }
  };

  switch = async () => {
    let { dirForward } = this.state;
    this.setState(
      {
        dirForward: !dirForward,
      },
      () => {
        const { current } = this.formRef;
        const { origin_amount, aim_amount } = current.getFieldsValue([
          'origin_amount',
          'aim_amount',
        ]);
        const { lastMod } = this.state;
        if (lastMod === 'origin') {
          current.setFieldsValue({
            aim_amount: origin_amount,
          });
          this.calcAmount(0, origin_amount);
          this.setState({
            lastMod: 'aim',
            aim_amount: origin_amount,
          });
        } else if (lastMod === 'aim') {
          current.setFieldsValue({
            origin_amount: aim_amount,
          });
          this.calcAmount(aim_amount, 0);
          this.setState({
            lastMod: 'origin',
            origin_amount: aim_amount,
          });
        }
      },
    );
  };

  showUI = (name) => {
    this.setState({
      page: name,
    });
  };

  changeOriginAmount = (value) => {
    if (value > 0) {
      const fee = formatAmount(BigNumber(value).multipliedBy(feeRate), 8);
      this.setState({
        origin_amount: value,
        fee,
        lastMod: 'origin',
      });
      // this.calc(value - fee);
      this.calcAmount(value, 0);
    } else {
      this.formRef.current.setFieldsValue({
        aim_amount: 0,
      });
      this.setState({
        fee: 0,
        slip: 0,
        lastMod: '',
        aim_amount: 0,
      });
    }
  };

  changeAimAmount = (value) => {
    if (value > 0) {
      this.setState({
        aim_amount: value,
        lastMod: 'aim',
      });
      this.calcAmount(0, value);
    } else {
      this.formRef.current.setFieldsValue({
        origin_amount: 0,
      });
      this.setState({
        fee: 0,
        slip: 0,
        lastMod: '',
        origin_amount: 0,
      });
    }
  };

  renderOriginToken() {
    const { token1, token2 } = this.props;
    const { dirForward } = this.state;
    const origin_token = dirForward ? token1 : token2;
    const symbol1 = origin_token.symbol.toUpperCase();
    return (
      <div className={styles.box}>
        <div className={styles.coin} onClick={() => this.showUI('selectToken')}>
          <TokenLogo name={symbol1} />
          <div className={styles.name}>{symbol1}</div>
          <DownOutlined />
        </div>
        <FormItem name="origin_amount">
          <InputNumber
            className={styles.input}
            onChange={this.changeOriginAmount}
            onPressEnter={this.changeOriginAmount}
            formatter={(value) => parseFloat(value || 0)}
            min="0"
          />
        </FormItem>
      </div>
    );
  }

  renderAimToken() {
    const { token1, token2, pairData } = this.props;
    const { dirForward } = this.state;
    const aim_token = dirForward ? token2 : token1;
    const symbol2 = aim_token.symbol.toUpperCase();
    return (
      <div className={styles.box}>
        <div className={styles.coin} onClick={() => this.showUI('selectToken')}>
          <div style={{ width: 40 }}>
            {symbol2 && <TokenLogo name={symbol2} />}
          </div>
          <div className={styles.name}>{symbol2 || _('select')}</div>
          <DownOutlined />
        </div>
        <FormItem name="aim_amount">
          <InputNumber
            className={styles.input}
            onChange={this.changeAimAmount}
            onPressEnter={this.changeAimAmount}
            formatter={(value) => parseFloat(value || 0)}
            min="0"
            max={Math.floor(pairData ? pairData.swapToken1Amount : 0)}
          />
        </FormItem>
      </div>
    );
  }

  setOriginBalance = () => {
    const { userBalance, token2 } = this.props;

    const origin_amount = this.state.dirForward
      ? userBalance.BSV || 0
      : userBalance[token2.codeHash] || 0;
    this.formRef.current.setFieldsValue({
      origin_amount,
    });
    this.setState({
      origin_amount,
    });
    this.calcAmount(origin_amount, 0);
    if (origin_amount > 0) {
      this.setState({
        // origin_amount,
        lastMod: 'origin',
        fee: formatAmount(BigNumber(origin_amount).multipliedBy(feeRate), 8),
      });
    } else {
      this.setState({
        lastMod: '',
      });
    }
  };
  calcAmount = (originAddAmount = 0, aimAddAmount = 0) => {
    const { pairData, token1, token2 } = this.props;
    const { dirForward } = this.state;
    const { swapToken1Amount, swapToken2Amount, swapFeeRate } = pairData;
    let amount1 = dirForward ? swapToken1Amount : swapToken2Amount;
    let amount2 = dirForward ? swapToken2Amount : swapToken1Amount;
    let _originAddAmount = BigNumber(originAddAmount).multipliedBy(
      Math.pow(10, token1.decimal || 8),
    );
    let _aimAddAmount = BigNumber(aimAddAmount).multipliedBy(
      Math.pow(10, token2.decimal),
    );
    let newAmount1 = BigNumber(amount1),
      newAmount2 = BigNumber(amount2);
    if (originAddAmount > 0) {
      const addAmountWithFee = _originAddAmount.multipliedBy(
        FEE_FACTOR - swapFeeRate,
      );
      newAmount1 = BigNumber(amount1).plus(_originAddAmount);
      let removeAmount = addAmountWithFee
        .multipliedBy(amount2)
        .div(
          BigNumber(amount1).multipliedBy(FEE_FACTOR).plus(addAmountWithFee),
        );
      newAmount2 = BigNumber(amount2).minus(removeAmount);

      removeAmount = formatAmount(
        removeAmount.div(Math.pow(10, token2.decimal)),
        8,
      );

      this.formRef.current.setFieldsValue({
        aim_amount: removeAmount,
      });
      this.setState({
        aim_amount: removeAmount,
      });
    } else if (aimAddAmount > 0) {
      newAmount2 = BigNumber(amount2).minus(_aimAddAmount);
      const addAmountWithFee = _aimAddAmount
        .multipliedBy(amount1)
        .multipliedBy(FEE_FACTOR)
        .div(newAmount2);

      let addAmount = addAmountWithFee.div(FEE_FACTOR - swapFeeRate);
      addAmount = addAmount.div(Math.pow(10, token1.decimal || 8));
      newAmount1 = addAmount.plus(amount1);
      let addAmountN = formatAmount(addAmount, 8);
      if (!addAmount.isGreaterThan(0)) {
        addAmountN = 0;
        newAmount1 = amount1;
        newAmount2 = BigNumber(amount2);
      }

      this.formRef.current.setFieldsValue({
        origin_amount: addAmountN,
      });
      this.setState({
        origin_amount: addAmountN,
        fee:
          addAmount > 0
            ? addAmount.multipliedBy(feeRate).toFixed(2).toString()
            : 0,
      });
    } else {
      //两个值都没有大于0
      this.formRef.current.setFieldsValue({
        origin_amount: originAddAmount,
        aim_amount: aimAddAmount,
      });
      this.setState({
        origin_amount: originAddAmount,
        aim_amount: aimAddAmount,
      });
    }

    const p = BigNumber(amount2).dividedBy(amount1);
    const p1 = newAmount2.dividedBy(newAmount1);
    const slip = p1.minus(p).dividedBy(p);

    this.setState({
      slip: slip.multipliedBy(100).abs().toFixed(2).toString() + '%',
    });
  };

  renderForm = () => {
    const { token1, token2, pairData, userBalance, submiting } = this.props;
    const { swapToken1Amount, swapToken2Amount } = pairData;
    const { dirForward } = this.state;
    const origin_token = dirForward ? token1 : token2;
    const aim_token = dirForward ? token2 : token1;
    const { slip, fee } = this.state;
    const symbol1 = origin_token.symbol.toUpperCase();
    const symbol2 = aim_token.symbol.toUpperCase();
    const price = dirForward
      ? formatAmount(swapToken2Amount / swapToken1Amount)
      : formatAmount(swapToken1Amount / swapToken2Amount);
    log(price);

    const tol =
      datas[window.localStorage.getItem(storage_name)] || datas[defaultIndex];
    const beyond = parseFloat(slip) > parseFloat(tol);

    return (
      <div className={styles.content}>
        <Spin spinning={submiting}>
          <Form onSubmit={this.handleSubmit} ref={this.formRef}>
            <div className={styles.title}>
              <h3>{_('you_pay')}</h3>
              <div className={styles.balance} onClick={this.setOriginBalance}>
                {_('your_balance')}:{' '}
                <span>
                  {userBalance[origin_token.codeHash || 'BSV'] || 0} {symbol1}
                </span>
              </div>
            </div>
            {this.renderOriginToken()}

            <div className={styles.switch_icon}>
              <div className={styles.icon} onClick={this.switch}>
                <CustomIcon type="iconswitch" style={{ fontSize: 20 }} />
              </div>
              <div className={styles.line}></div>
            </div>

            <div className={styles.title}>
              <h3>
                {_('you_receive')}{' '}
                <span className={styles.normal}>({_('estimated')})</span>
              </h3>
            </div>

            {this.renderAimToken()}

            <div className={styles.key_value}>
              <div className={styles.key}>{_('price')}</div>
              <div className={styles.value}>
                1 {symbol1} = {price} {symbol2}
              </div>
            </div>
            <div className={styles.key_value}>
              <div className={styles.key}>{_('slippage_tolerance')}</div>
              <div className={styles.value}>{tol}</div>
            </div>
            {this.renderButton()}
            <div className={styles.key_value}>
              <div className={styles.key}>{_('price_impact')}</div>
              <div
                className={styles.value}
                style={beyond ? { color: 'red' } : {}}
              >
                {slip}
              </div>
            </div>
            <div className={styles.key_value}>
              <div className={styles.key}>{_('fee')}</div>
              <div className={styles.value}>
                {fee} {symbol1}
              </div>
            </div>
          </Form>
        </Spin>
      </div>
    );
  };

  login() {
    EventBus.emit('login');
  }

  renderButton() {
    const { isLogin, pairData, token1, token2, userBalance } = this.props;
    const { slip, lastMod, origin_amount, aim_amount, dirForward } = this.state;
    const origin_token = dirForward ? token1 : token2;
    const aim_token = dirForward ? token2 : token1;
    const balance = userBalance[origin_token.codeHash || 'BSV'];

    const tol =
      datas[window.localStorage.getItem(storage_name)] || datas[defaultIndex];
    const beyond = parseFloat(slip) > parseFloat(tol);
    if (!isLogin) {
      // 未登录
      return (
        <Button className={styles.btn_wait} onClick={this.login}>
          {_('login')}
        </Button>
      );
    } else if (!pairData) {
      // 不存在的交易对
      return <Button className={styles.btn_wait}>{_('no_pair')}</Button>;
    } else if (!lastMod || (origin_amount <= 0 && aim_amount <= 0)) {
      // 未输入数量
      return <Button className={styles.btn_wait}>{_('enter_amount')}</Button>;
    } else if (parseFloat(origin_amount) > parseFloat(balance || 0)) {
      // 余额不足
      return <Button className={styles.btn_wait}>{_('lac_balance')}</Button>;
    } else if (
      BigNumber(aim_amount)
        .multipliedBy(Math.pow(10, aim_token.decimal))
        .isGreaterThan(
          dirForward ? pairData.swapToken2Amount : pairData.swapToken1Amount,
        )
    ) {
      // 池中币不足
      return (
        <Button className={styles.btn_wait}>
          {_('not_enough', token2.symbol.toUpperCase())}
        </Button>
      );
    } else if (beyond) {
      // 超出容忍度
      return (
        <Button className={styles.btn_warn} onClick={this.submit}>
          {_('swap_anyway')}
        </Button>
      );
    } else {
      return (
        <Button className={styles.btn} type="primary" onClick={this.submit}>
          {_('swap')}
        </Button>
      );
    }
  }

  submit = async () => {
    const { dirForward, origin_amount, aim_amount } = this.state;
    const { dispatch, currentPair, userAddress, token2 } = this.props;
    // console.log(origin_amount, aim_amount);

    const res = await dispatch({
      type: 'pair/reqSwap',
      payload: {
        symbol: currentPair,
        address: userAddress,
        op: dirForward ? 3 : 4,
      },
    });

    if (res.code) {
      return message.error(res.msg);
    }

    let payload = {
      symbol: currentPair,
      requestIndex: res.data.requestIndex,
      op: dirForward ? 3 : 4,
    };
    const { bsvToAddress, tokenToAddress, txFee } = res.data;
    if (dirForward) {
      const amount = BigNumber(origin_amount).multipliedBy(1e8);
      const ts_res = await dispatch({
        type: 'user/transferBsv',
        payload: {
          address: bsvToAddress,
          amount: amount.plus(txFee).toFixed(0),
        },
      });
      //   console.log(ts_res);

      if (ts_res.msg) {
        return message.error(ts_res.msg);
      }
      payload = {
        ...payload,
        token1TxID: ts_res.txid,
        token1OutputIndex: 0,
        token1AddAmount: amount.toFixed(0),
      };
    } else {
      const amount = BigNumber(origin_amount)
        .multipliedBy(Math.pow(10, token2.decimal))
        .toFixed(0);
      const bsv_tx_res = await dispatch({
        type: 'user/transferFtTres',
        payload: {
          address: tokenToAddress,
          amount: amount,
          codehash: token2.codeHash,
          genesishash: token2.tokenID,
        },
      });
      if (bsv_tx_res.msg) {
        return message.error(bsv_tx_res.msg);
      }
      const token_tx_res = await dispatch({
        type: 'user/transferBsv',
        payload: {
          address: bsvToAddress,
          amount: txFee,
        },
      });
      if (token_tx_res.msg) {
        return message.error(token_tx_res.msg);
      }
      payload = {
        ...payload,
        minerFeeTxID: token_tx_res.txid,
        minerFeeTxOutputIndex: 0,
        token2TxID: bsv_tx_res.txid,
        token2OutputIndex: 0,
      };
    }

    const swap_res = await dispatch({
      type: 'pair/swap',
      payload,
    });
    // console.log(payload, swap_res);

    if (swap_res.code) {
      return message.error(swap_res.msg);
    }
    message.success('success');
    this.setState({
      formFinish: true,
      txid: swap_res.data,
      txFee: txFee,
    });
  };

  viewDetail = () => {
    this.setState({
      showDetail: true,
    });
  };
  closeDetail = () => {
    this.setState({
      showDetail: false,
    });
  };

  renderResult() {
    const {
      showDetail,
      origin_amount,
      aim_amount,
      txFee,
      dirForward,
      txid,
    } = this.state;
    const { token1, token2, userAddress } = this.props;
    const origin_token = dirForward ? token1 : token2;
    const aim_token = dirForward ? token2 : token1;
    const symbol1 = origin_token.symbol.toUpperCase();
    const symbol2 = aim_token.symbol.toUpperCase();

    return (
      <div className={styles.content}>
        <div className={styles.finish_logo}></div>
        <div className={styles.finish_title}>
          {_('swapping_for').replace('%1', symbol1).replace('%2', symbol2)}
        </div>

        {showDetail ? (
          <div className={styles.detail}>
            <div className={styles.detail_title}>{_('tx_details')}</div>
            <div className={styles.detail_item}>
              <div className={styles.item_label}>{_('account')}</div>
              <div className={styles.item_value}>{userAddress}</div>
            </div>

            <div className={styles.detail_item}>
              <div className={styles.item_label}>{_('paid')}</div>
              <div className={styles.item_value}>
                {origin_amount} {symbol1}
              </div>
            </div>
            <div className={styles.detail_item}>
              <div className={styles.item_label}>{_('received')}</div>
              <div className={styles.item_value}>
                {aim_amount} {symbol2}
              </div>
            </div>
            <div className={styles.detail_item}>
              <div className={styles.item_label}>{_('swap_fee')}</div>
              <div className={styles.item_value}>{formatSat(txFee)} BSV</div>
            </div>
            <div className={styles.detail_item}>
              <div className={styles.item_label}>{_('onchain_tx')}</div>
              <div className={styles.item_value}>{txid}</div>
            </div>
          </div>
        ) : (
          <div className={styles.view_detail} onClick={this.viewDetail}>
            {_('view_tx_detail')}
          </div>
        )}
        <Button className={styles.done_btn} onClick={this.finish}>
          {_('done')}
        </Button>
      </div>
    );
  }
  finish = () => {
    this.setState({
      formFinish: false,
      origin_amount: 0,
      aim_amount: 0,
      lastMod: '',
      fee: 0,
      slip: 0,
    });
  };

  renderSwap() {
    const { formFinish } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.menu}>
            {menu.map((item) => {
              let cls = jc(styles.menu_item, styles[`menu_item_${item.key}`]);
              if (item.key === menu[0].key) {
                cls = jc(
                  styles.menu_item,
                  styles.menu_item_selected,
                  styles[`menu_item_${item.key}`],
                );
              }
              return (
                <span
                  className={cls}
                  onClick={() => this.gotoPage(item.key)}
                  key={item.key}
                >
                  {item.label}
                </span>
              );
            })}
          </div>
          <div className={styles.setting}>
            <SettingOutlined onClick={() => this.showUI('setting')} />
          </div>
        </div>
        {formFinish ? this.renderResult() : this.renderForm()}
      </div>
    );
  }

  selectedToken = (currentPair) => {
    if (currentPair && currentPair !== this.props.currentPair) {
      // if (this.state.page === 'selectToken') {
      this.props.dispatch({
        type: 'pair/getPairData',
        payload: {
          currentPair,
        },
      });
      // }
      this.setState({
        origin_amount: 0,
        aim_amount: 0,
      });
    }
    this.showUI('form');
  };

  render() {
    const { currentPair, loading } = this.props;
    if (loading) return <Loading />;
    if (!currentPair) return 'No pair';
    const { page } = this.state;
    return (
      <div style={{ position: 'relative' }}>
        {this.renderSwap()}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: page === 'selectToken' ? 'block' : 'none',
          }}
        >
          <div className={styles.selectToken_wrap}>
            <SelectToken close={(id) => this.selectedToken(id, page)} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: page === 'setting' ? 'block' : 'none',
          }}
        >
          <Setting close={() => this.showUI('form')} />
        </div>
      </div>
    );
  }
}
