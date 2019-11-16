import React, { useEffect } from 'react';
import { List } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { Header, WithStylesHoc } from '@/components';
import { buyAndSell, upAndDown, timeToSell, classroom, questionIcon } from '@/assets';
import styles from './styles.scss';

const Item = List.Item;
const Brief = Item.Brief;

const Home = props => {
  const history = useHistory();

  function handleClick(type) {
    history.push(`/${type}`);
  }

  const right = {
    title: '我的盯盘',
    action: function() {
      history.push('/mystaring');
    },
  };

  return (
    <div className={styles.container}>
      <Header title="智能盯盘" right={right} />
      <div className={styles.header}></div>
      <div className={styles.setting}>
        <div className={styles.strategyHeader}>设置盯盘策略</div>
        <List>
          <Item
            arrow="horizontal"
            thumb={buyAndSell}
            multipleLine
            onClick={() => handleClick('buyAndSell')}
          >
            买入卖出价格提醒 <Brief>股票价格达到预期价位 实时提醒</Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb={upAndDown}
            multipleLine
            onClick={() => handleClick('upAndDown')}
          >
            涨跌幅提醒 <Brief>预设买入日涨跌幅 实时监控异常波动</Brief>
          </Item>
          <Item
            arrow="horizontal"
            thumb={timeToSell}
            multipleLine
            onClick={() => handleClick('profitAndLoss')}
          >
            止盈止损提醒 <Brief>设置止盈止损条件 到点出发提醒</Brief>
          </Item>
        </List>
      </div>
      <div className={styles.about}>
        <List>
          <Item arrow="horizontal" thumb={classroom} onClick={() => history.push('/classroom')}>
            智能盯盘小课堂
          </Item>
          <Item thumb={questionIcon}>什么是智能盯盘？</Item>
          <Item thumb={questionIcon}>智能盯盘支持哪些市场与指数？</Item>
          <Item thumb={questionIcon}>如何设置接收盯盘消息？</Item>
        </List>
      </div>
    </div>
  );
};

export default WithStylesHoc(Home, styles);
