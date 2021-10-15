'use strict';
import React from 'react';
import CustomIcon from 'components/icon';
import styles from './index.less';
import { connect } from 'umi';

@connect(({ pair }) => {
  return {
    ...pair,
  };
})
export default class TokenIcon extends React.Component {
  render() {
    const { icon, url, size = 40, style, iconList } = this.props;
    // console.log(iconList);
    if (icon) {
      return <CustomIcon type={icon} style={{ fontSize: size, ...style }} />;
    }

    if (url) {
      return (
        <img
          src={url}
          style={{ width: size, height: size, ...style, borderRadius: 20 }}
        />
      );
    }

    let { name, genesisID } = this.props;
    const icons_name = iconList[genesisID];
    if (icons_name) {
      if (icons_name.type) {
        return (
          <CustomIcon
            type={icons_name.type}
            style={{
              fontSize: size,
              ...style,
              backgroundColor: '#fff',
              borderRadius: '50%',
            }}
          />
        );
      } else if (icons_name.url) {
        return (
          <img
            src={icons_name.url}
            style={{ width: size, height: size, ...style, borderRadius: 20 }}
          />
        );
      }
    }

    if (!name) {
      return null;
    }
    if (name) name = name.toLowerCase();
    const letter = name.substr(0, 1).toUpperCase();
    return (
      <div
        className={styles.logo}
        style={{
          fontSize: size * 0.84,
          width: size,
          height: size,
          lineHeight: `${size}px`,
          ...style,
        }}
      >
        {letter}
      </div>
    );
  }
}
