import React, { useCallback, useEffect } from 'react';
import Notice from 'components/notice';
import { Tag, Spin, Card } from "antd";
import {
    FileTextOutlined
} from '@ant-design/icons';
import { PlusCircleFilled } from '@ant-design/icons';
import Layout from '../layout';
import Header from '../layout/header';
import './index.less'
import { connect } from 'dva';
import { history } from 'umi'
import api from '../../api/poolv2';
import TokenPair from 'components/tokenPair';
import { sqrtX96ToPrice } from '../../utils/helper';
import { getSqrtRatioAtTick } from '../../utils/tickMath';
import { formatSat } from 'common/utils';
import arrow from '../../assets/arrow.svg'
const PositionCard = ({ pairName, feeRate, inRange, minPrice, maxPrice, tickLower, tickUpper, icons }) => (
    <div className="position-card" onClick={() => { history.push(`/v2pool/pos/${pairName}?tickLower=${tickLower}&tickUpper=${tickUpper}`) }}>
        <div className='cardLeft'>
            <TokenPair
                symbol1={pairName.split('-')[0]}
                genesisID1={pairName.split('-')[0]}
                url1={icons[pairName.split('-')[0]] || ''}
                url2={icons[pairName.split('-')[1]] || ''}
                symbol2={pairName.split('-')[1]}
                genesisID2={pairName.split('-')[1]}
                size={48}
            />
            <div className='info'>
                <div className='titleWrap'>
                    <div className='pairName'>{pairName.replace('-', '/').toUpperCase()}</div>
                    <div className='feeRate'>{feeRate}% Spread Factor</div>
                </div>
                <div>
                    {!inRange ? <Tag color="#FFEED9" style={{ color: '#303133', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ display: 'block', width: 6, height: 6, background: '#FF8F1F', borderRadius: '50%' }}></span> OUT OF RANGE
                    </Tag> : <Tag color="#DEF9F0" style={{ color: '#303133', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ display: 'block', width: 6, height: 6, background: '#00B578', borderRadius: '50%' }}></span> IN RANGE
                    </Tag>}
                </div>


            </div>
        </div>
        <div className='cardRight'>
            <div className='label'>Selected Range</div>
            <div className='range'>{minPrice} <img src={arrow} /> {maxPrice}</div>
        </div>
    </div>
);
const PoolV2 = ({ user, poolV2 }) => {
    const { pairs, icons, curPair } = poolV2
    const [positions, setPositions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { isLogin, accountInfo: { userAddress, userBalance } } = user;
    const getUserPoolV2s = useCallback(async () => {
        if (userAddress) {
            const res = await api.queryUserPositions(userAddress);
            if (res && res.data) {
                let _positions = [];
                for (let pairName in res.data) {
                    const { positions: pairPos, currentPrice, currentTick, feeRate } = res.data[pairName];
                    pairPos.forEach((pos) => {
                        //TODO USDT 
                        const minPrice = (sqrtX96ToPrice(getSqrtRatioAtTick(pos.tickLower))).toFixed(4);
                        const maxPrice = sqrtX96ToPrice(getSqrtRatioAtTick(pos.tickUpper)).toFixed(4);

                        const inRange = pos.tickLower < Number(currentTick) && pos.tickUpper > Number(currentTick);
                        _positions.push({ pairName, currentPrice, currentTick, minPrice, maxPrice, inRange, feeRate, ...pos })
                    })

                }
                setPositions(_positions);
            }
        } else {
            setPositions([])
        }
        setLoading(false)
    }, [userAddress])

    const [rewardingPool, setRewardingPool] = React.useState([]);

    useEffect(() => { getUserPoolV2s() },
        [getUserPoolV2s])

    useEffect(() => {
        const now = new Date().getTime() / 1000;
        if (pairs) {
            const _rewardingPool = pairs.filter(pair => {
                return pair.reward.rewardStartTime < now && now < pair.reward.rewardEndTime && pair.reward.rewardAmountPerSecond > 0
            })
            setRewardingPool(_rewardingPool)
        }
    }, [pairs])

    return (
        <Layout>
            <Notice />
            <div className='poolV2container' >
                <Header />
                <div className='wrap'>
                    <div className="positionContainer">
                        <div className="leftPosition">Your Positions</div>
                        <div className="rightPosition" onClick={() => { history.push(`/v2pool/add/${curPair.pairName}`) }}><PlusCircleFilled style={{ color: '#1e2bff' }} /> New Position</div>
                    </div>
                    <Spin spinning={loading}>
                        <div className="positions-list">
                            {positions.map((position, index) => (
                                <PositionCard key={String(position.tickLower) + String(position.tickUpper) + position.pairName} index={index} icons={icons} {...position} />
                            ))}
                            {!loading && positions.length > 0 && <div className="no-more">No More</div>}

                        </div>
                        {!loading && positions.length === 0 && <div className="nothing-here">
                            <div className="nothing-here-icon"><FileTextOutlined style={{ color: '#EDEFF2' }} /></div>
                            <div className="nothing-here-text" style={{ color: '#BFC2CC' }}>Nothing Here...</div>
                        </div>}
                    </Spin>

                </div>
                {rewardingPool.length > 0 && <div className='wrap'>
                    <div className="positionContainer">
                        <div className="leftPosition">Rewarding Pool</div>


                    </div>
                    <div>
                        <div className="positions-list">
                            {rewardingPool.map((pool, index) => (
                                <Card key={pool.pairName} style={{ borderRadius: 12 }} onClick={() => { history.push(`/v2pool/add/${pool.pairName}`) }}>
                                    <div className='poolCard'>


                                        <div className="title">
                                            <TokenPair
                                                symbol1={pool.pairName.split('-')[0]}
                                                genesisID1={pool.pairName.split('-')[0]}
                                                url1={icons[pool.pairName.split('-')[0]] || ''}
                                                url2={icons[pool.pairName.split('-')[1]] || ''}
                                                symbol2={pool.pairName.split('-')[1]}
                                                genesisID2={pool.pairName.split('-')[1]}
                                                size={48}
                                            />
                                            <div className='titleWrap'>
                                                <div className='pairName'>{pool.pairName.toUpperCase().replace('-', '/')}</div>
                                                <div className='feeRate'>{pool.feeRate}% Spread Factor</div>
                                            </div>



                                        </div>
                                        <div className='rewardInfo'>

                                            <div className='rewardInfoItem'>
                                                <div className='label'>Start Time</div>
                                                <div className='value'>{new Date(pool.reward.rewardStartTime * 1000).toLocaleString()}</div>
                                            </div>
                                            <div className='rewardInfoItem'>
                                                <div className='label'>End Time</div>
                                                <div className='value'>{new Date(pool.reward.rewardEndTime * 1000).toLocaleString()}</div>
                                            </div>
                                            <div className='rewardInfoItem'>
                                                <div className='label'>Rewad Per Day</div>
                                                <div className='value'>{formatSat(Number(pool.reward.rewardAmountPerSecond) * 86400, pool.reward.token.decimal)} </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>}
            </div>
        </Layout>
    );
};

const mapStateToProps = ({ user, poolV2 }) => {
    return {
        user,
        poolV2
    };
};

export default connect(mapStateToProps)(PoolV2);
