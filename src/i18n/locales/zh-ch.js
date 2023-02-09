const texts = {
  wallet: '钱包',
  swap: '交易',
  pool: '流动池',
  explore: '浏览',

  market: '市价',
  limit: '限价',
  done: '完成',

  about: '关于',
  txs: '交易',
  website: '网站',
  per: '每',
  pair_stat: '交易对数据',
  total_liq: '所有流动性资产',
  volume: '交易量',
  hrs: '小时',
  pooled_tokens: '加入流动池的资产',

  name: '名称',
  total_value: '总额',
  time: '时间',

  connect_wallet: '连接钱包',
  connected_account: '已连接的钱包',
  show_qr_code: '账户地址二维码',
  qr_code: '账户地址二维码',
  copy_account: '复制账户地址',
  switch_wallet: '切换钱包',
  go_to_infopage: '账户页面',
  disconnect_account: '解绑钱包',
  copied: '已复制',

  you_pay: '支付',
  your_balance: '余额',
  you_receive: '收到',
  estimated: '预估',
  price: '价格',
  slippage_tolerance: '滑点容忍值',
  enter_amount: '输入金额',
  minimum_received: '最少收到',
  price_impact: '价格影响幅度',
  fee: '手续费',

  tx_settings: '交易设置',
  reset: '重置',
  tolerance_desc:
    '当价格影响幅度大于滑点容忍值时, 界面会给出提示，仍可选择继续交易',

  select_token: '选择资产',

  search_token_holder: '用Genesis或者名称进行搜索',
  swapping_for: '用 %1 交换 %2',
  time_left: '预估剩余时间 %s',
  view_tx_detail: '查看交易细节',
  tx_details: '交易详情',
  status: '状态',
  volt_account: 'Volt 账户',
  paid: '支付',
  received: '收到',
  swap_fee: '矿工费',
  date: '日期',
  onchain_tx: '链上交易',
  confirmation: '已确认',

  pair_liq_pool: '资产对流动性池',
  add_liq: '提供流动性',
  add_liq_short: '提供流动性',
  remove_liq: '移除流动性',
  remove_liq_short: '移除',
  create_pair: '创建交易对',
  select_pair: '选择交易对',
  promote: '完成',
  input: '添加',
  balance: '余额',
  pool_share: '价格和占流动池份额',
  pooled: '流动池中的%s数量',
  your_share: '您的流动池占比',
  select_a_token_pair: '选择一个交易对',
  supply_liq: '提供流动性',
  pair_created: '成功创建了交易对',
  share_pair: '分享交易对 %s 的链接',

  volume_24: '24小时交易量',
  txs_24: '24小时交易笔数',
  fees_24: '24小时手续费',
  users_24: '24小时用户数',
  tokens_coins: '资产',
  asset: '资产',
  change_24: '24小时价格变化',
  last_7: '过去7天',
  market_cap: '市值',

  select_wallet_title: '选择钱包',
  permission_request: 'MVCSwap 授权请求',
  permis_tips_1: '用您的Volt账号登录',
  permis_tips_2: '使用您的Volt数据(头像, Paymail)',
  permis_tips_3: '获取您的账户余额',
  permis_tips_4: '发起交易',
  agree_switch: '同意切换',
  cancel: '取消',

  your_account: '您的账户',
  your_active: '您的活动轨迹',
  your_balances: '余额',
  your_liq: '您的流动性流动池数据',
  manage: '管理',
  no_liq: '您没有为任何交易对提供流动性',
  your_open_order: '您的限价单挂单',
  no_order: '您没有挂单',
  open_order: '挂单',
  no_active: '您最近没有任何记录',
  explore_tokens: '浏览资产概况',
  adds: '添加流动性',
  swaps: '交易',
  liq: '流动性',
  all: '所有',
  pair: '交易对',
  expires_in: '失效',
  cancel_all: '取消所有',
  total: '所有',

  back_prort: '回到您的资产组合',
  your_total_liq: '您所有的流动性',
  include_fees: '包括费用',
  fees_earned: '转到的费用收入',
  cumulative: '累积的',

  back: '返回',
  add: '添加',
  remove: '移除',
  max: '最大',
  liq_removed: '移除的流动性',
  your_pos: '您移除的仓位',
  your_re_liq: '您赎回的流动性',

  connect_volt: '连接您的Volt钱包',
  scan_app: '用您的Volt钱包扫描解锁',
  refresh_url: '点击刷新二维码',
  download_app_1: '从',
  download_app_2: '或以下渠道下载',

  launch_app: '交易',
  tokenswap: 'MVCSwap',
  tokenswap_desc: '基于MVC的链上去中心化交易所',
  documentation: '文档',
  comparisons: '比较',
  comp_ts: 'MVCSwap和其他类型交易所的异同对比',
  comp_ts_h5: '比较MVCSwap',
  feature: '关键功能',
  cex: '中心化交易所',
  other_dex: '其他 DEX',
  lb_1: '资产保存在自管钱包',
  lb_2: '链上去信任交易',
  lb_3: '充值0确认/即时确认',
  lb_4: '提币0确认/即时到账l',
  lb_5: '提币0手续费用',
  lb_6: '无 TPS性能限制 (与ETH，BTC等比较)',
  lb_7: '无需担心因交易所账户信息泄露导致资金被盗',
  lb_8: '免于中心化交易所拔网线，操纵数据，伪造数据侵害用户利益',
  lb_9: '没有抢跑交易从而损害正常交易用户利益',
  lb_10: '超低费用的即时交易撮合，即时完成交易',

  swap_anyway: '继续交易',
  select: '选择',
  login: '登录',
  lac_balance: '余额不足',
  lac_token_balance: '%s 余额不足',
  need_token: '至少需要',
  you_have: '您的余额',
  no_pair: '没有该交易对',
  not_enough: '超出了%s流动池存量',
  lower_amount: '输入至少高于%s聪',

  pay: '支付',
  just: '刚刚',
  minute_ago: ' 分钟前',
  minutes_ago: ' 分钟前',
  hour_ago: ' 小时前',
  hours_age: ' 小时前',
  day_ago: ' 天前',
  days_ago: ' 天前',
  week_ago: ' 周前',
  weeks_ago: ' 周前',
  month_ago: ' 月前',
  months_ago: ' 月前',
  year_ago: ' 年前',
  years_ago: ' 年前',
  start_swapping: '开始交易',
  start_pooling: '开始流动性',
  wallet_connected: '钱包已连接',
  account: '账户',
  withdraw: '提币',

  web_wallet: '网页钱包',
  web_wallet_tips:
    '提示：Web钱包的私钥是通过用户的用户名和密码实时计算得到，不会上传服务器，也不会保存在本地。仅供方便用户测试之用，不适合存放大量资金，建议用户妥善保管用户名+密码组合以防资金丢失，或在使用完成之后将剩余资金转移。用户名+密码组合丢失(忘记，被盗等情形)会导致资产丢失',
  deposit_title: '充值',
  withdraw_title: '提款',
  availabel: '可用余额',
  money: '金额',
  address: '地址',
  all_balance: '所有余额',
  back_to_swap: '返回到交易页面',
  swap_question: '您需要等额提供BSV/Token交易对里的两种资产到流动池',
  withdraw_success: '提币成功!',
  add_success: '增加成功',
  swap_price_change_title: '流动池变化导致价格变化提示',
  swap_price_change_content: '您正在用%1交换%2，在过去30秒内价格发生了%3的变化',
  liq_price_change_title: '流动池资金比例变动提示',
  liq_price_change_contnet:
    '有交易发生，导致流动池资金比例发生变动，额度有变化，从%1变为%2',
  liq_remove_price_change_content:
    '有交易发生，导致流动池资金比例发生变动，您可以移除的最大金额有变化，从%1变为%2',
  continue_add_liq: '继续提供',
  continue_remove_liq: '继续移除',
  your_lp: '您的LP(%s)数量',
  total_lp: 'LP(%s)总量',
  txs_fail: '交易失败',
  notice: '通知',
  // notice720:
  //   'tswap已经升级完毕，同时开通了新的mc/bsv交易对，如果在2021年7月22日16时前还有流动性在旧的bsv-mc流动池中没有提取的，请前往https://v1.tswap.io进行提取流动性。未提取流动性的用户根据在流动池中的比例将获得了新的mc token的空投。因此旧池˙中提取流动性出来的只有bsv，旧的mc token已停止使用。',
  // notice1117:
  //   'tswap预计在北京时间11月19日16点左右对usdt-tsc挖矿合约进行升级，升级后将上线新的usdt-tsc挖矿合约。旧的合约区块奖励将转移到新的挖矿合约上。用户可以在新的挖矿合约上线后从旧挖矿合约提取lp，锁仓到新的挖矿合约，以获得挖矿奖励。此次升级，swap合约不受影响。',
  notice0712:
    'tswap已上线新的usdt/bsv交易对，请旧的usdt/bsv的lp用户从挖矿中提币，并在流动池中移除流动性，然后在新的BSV/USDT交易对中提供流动性，将新交易对的LP tokrn锁定在farm合约中以获取流动性挖矿奖励',
  notice2709:
    '⚠️ MVCSwap 受到 Volt Asset Bridge 关闭的影响。我们敦促用户从 USDT 和 NOVO 对中移除他们的流动性，并通过 Volt Asset Bridge 赎回它们',

  cant_remove: '您没有可移除的流动性资产',
  insufficient_balance: '您的流动性资产不足',
  test_only: '建议仅供测试',

  farm: '流动性挖矿',
  lock_earn: '锁仓赚币',
  earned: '赚取',
  depositors: '存款人数',
  crop: '收益',
  harvest: '提取',
  farm_desc: '提供流动性并将LP锁仓赚取收益',
  last_block_height: 'Oracle提供的BSV区块高度：',
  your_deposited_lp: '您锁仓的LP',
  abandoned_deposited_lp: '提取您所有的收益和LP token锁仓到新合约',
  apy_info: 'APR = (每区块奖励 * 144 * 365) * 收益token价格/锁仓总价值 * 100%',
  deposit: '锁仓',
  earn: '赚取',
  deposit_success: '锁仓成功',
  deposited: '锁仓',
  swap_success: '交易成功',
  lp_balance: '可提取',
  added: '添加',
  deposit_earn: '锁仓赚币',
  start_deposit: '开始锁仓',
  start_withdraw: '开始提取',
  farm_withdraw: '提取LP token',
  farm_withdraw_success: '提取成功',
  withdrew: '提取了',
  tvl: '总锁仓资金',
  apy: '年化收益',
  yield_tips: '可提取的收益: %s',
  harvest_success: '收益提取成功',
  amount: '数量',
  payout: '奖励',
  payout_tips: '每个区块的奖励',
  deposit_lp: '锁仓LP',
  withdraw_lp: '提取LP',

  create_new_pair: '创建交易对',
  create_newpair: '上架新交易对',
  newpair_title: '上架新交易对的要求',
  newpair_desc1: '项目代币不能用于欺诈和圈钱',
  newpair_desc2:
    '支付10,000TSC作为创建swap合约的技术服务费，一旦合约创建成功，不予退还',
  newpair_desc3: '上架token的 Genesis ID',
  newpair_desc4: '要添加到流动池的资产',
  newpair_note1: '注意: MVCSwap 有权在任何时候下架任何交易对',
  newpair_note2: '了解可能导致交易对或资产下架的情况',
  add_details: '添加详情',
  pay_fee: '支付费用',
  finish: '完成',
  enter_tokenid: '输入Token的Genesis ID',
  enter_bsv_or_tokenid: '输入BSV或Token的Genesis ID',
  find_tokenid: 'Token Genesis IDs 可以找到',
  select_token_pair: '选择输入交易对',
  next_step: '下一步',
  pay_listing_fee: '支付上架费用',
  confirm_and_pay: '确认细节支付费用',
  confirm_pair_desc: '上架此交易对需要支付10,000TSC',
  edit: '编辑',
  create_success: '交易对添加成功',
  curated_tokens: '精选资产',
  unverified_zone: '试验区',

  risks_dis: '风险提示和声明',
  risks_desc: '请在使用MVCSwap之前仔细阅读并知晓风险',
  acknowlege: '已知晓',
  not_acknowlege: '不知道风险',
  download_metalet:
    '请先安装Metalet插件。如果已经安装，请刷新页面。点击确定下载插件。',

  //创建自定义交易对
  create_farm_pair: '发布流动性挖矿计划',
  enter_details: '输入详情',
  deposit_rewards: '奖励token充值',
  lptoken_genesis_id: 'LP token的Genesis ID',
  reward_genesis_id: '奖励token的Genesis ID',
  reward_per_block: '每区块的奖励',
  duration_in_days: '持续时间(天)',
  avg_per_block: 'BSV出块平均时间10分钟',
  minimum_days: '最短 %s 天',
  create_farm_tips: '下一步需要充值全部的奖励token',
  reward_estimate: '大约. %s 奖励token',
  check_create_farm_title: '充值奖励token到合约',
  check_create_farm_desc: '在挖矿持续期间不能提取',
  reward: '奖励',
  duration: '持续期间',
  deposit_and_create: '充值完成发布',
  create_farm_success: '发布成功',
  create_farm_success_desc: '你的流动性挖矿计划已生效',
  network_fee: '矿工费',
  only_custom_token: 'Token B 只能是项目方Token',
  download_voltwallet:
    '请先安装Volt插件。如果已经安装，请刷新页面。点击确定下载插件。',
  tokenb_tips: 'Token B 只能是项目方token',
  tmp_tips: '测试交易对，请移除和此交易对相关的资产，一周后下架该交易对',
  //stake
  stake: '质押',
  stake_desc: '质押 %s 赚取 %1 和投票权',
  your_staked: '你的质押',
  total_staked: '所有质押',
  unstaked: '取消质押',
  withdraw_stake: '提取质押',
  vesting_term: '提取等待期',
  staking_yield: '质押收益',
  unstake: '取消质押',
  stake_amount: '质押数量',
  unstake_amount: '取消质押数量',
  stake_successful: '质押成功',
  staked: '质押数量',
  done: '完成',
  start_stake: '质押',
  unstake_successful: '成功取消质押',
  cant_unlock: '无法取消',

  block_later: '区块之后',
  blocks_later: '区块之后',

  vote: '投票',
  pending: '等待',
  cancelled: '取消',
  ongoing: '进行中',
  passed: '通过',
  rejected: '未通过',
  agreed: '同意',
  reject: '拒绝',
  change_vote: '在投票期间你可以改变你的投票',
  no_stake: '没有质押token',
  payout_per_block: '每区块的奖励',
  total_votes: '总投票数：',
  min_vote_amount: '最低投票数：',
  vesting_term: '投票结束时间： %s个区块之后',
  from_block: '起始高度',
  to_block: '终止高度',
};
module.exports = texts;
