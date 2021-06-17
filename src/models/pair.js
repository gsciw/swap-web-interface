import pairApi from '../api/pair';

export default {
  namespace: 'pair',

  state: {
    allPairs: {},
    currentPair: '',
    pairData: {},
    token1: {},
    token2: {},
    LP: 100000,
  },

  subscriptions: {
    async setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *getAllPairs({ payload }, { call, put }) {
      const res = yield pairApi.queryAllPairs.call(pairApi);
      // console.log(res)
      const { data } = res;

      if (res.code !== 0) {
        console.log(res.msg);
        return res;
      }
      let currentPair;

      Object.keys(data).forEach((item) => {
        if (item.indexOf('bsv-') > -1 || item.indexOf('-bsv') > -1) {
          currentPair = item;
        }
      });

      yield put({
        type: 'savePair',
        payload: {
          allPairs: data,
          currentPair,
        },
      });
      return data;
    },

    *getPairData({ payload }, { call, put }) {
      let { currentPair } = payload;
      const res = yield pairApi.querySwapInfo.call(pairApi, currentPair);
      // console.log(res);
      const { code, msg, data } = res;
      if (code !== 0) {
        console.log(msg);
        return res;
      }
      yield put({
        type: 'savePair',
        payload: {
          pairData: data,
          currentPair,
        },
      });
      // console.log(data)
      return data;
    },

    *reqSwap({ payload }, { call, put }) {
      const res = yield pairApi.reqSwap.call(pairApi, payload);
      console.log(res);
      return res;
    },

    *swap({ payload }, { call, put }) {
      const res = yield pairApi.swap.call(pairApi, payload);
      console.log(res);
      return res;
    },

    *addLiq({ payload }, { call, put }) {
      const res = yield pairApi.addLiq.call(pairApi, payload);
      console.log(res);
      return res;
    },

    *removeLiq({ payload }, { call, put }) {
      const res = yield pairApi.removeLiq.call(pairApi, payload);
      console.log(res);
      return res;
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    savePair(state, action) {
      let { allPairs, currentPair } = action.payload;
      if (!allPairs) allPairs = state.allPairs;

      const { token1, token2 } = allPairs[currentPair];

      return {
        ...state,
        ...action.payload,
        token1,
        token2,
      };
    },
  },
};
