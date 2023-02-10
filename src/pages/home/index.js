'use strict';
import React, { Component } from 'react';
import { history } from 'umi';
import { Button } from 'antd';
import Layout from '../layout';
import Lang from '../layout/lang';
import Nav from '../layout/nav';
import Footer from '../layout/footer';
import DarkMode from '../layout/darkmode';
import CustomIcon from 'components/icon';
import Notice from 'components/notice';
import Cookie from 'js-cookie';
import styles from './index.less';
import _ from 'i18n';
import { IconX, IconTick } from 'components/ui';

const _lang = Cookie.get('lang') || navigator.language;
export default class Home extends Component {
  renderList() {
    return (
      <div className={styles.list_container}>
        <div className={styles.list}>
          <div className={styles.list_hd}>
            <div className={styles.col_1}>{_('feature')}</div>
            <div className={styles.col_2}>{_('tokenswap')}</div>
            <div className={styles.col_3}>{_('cex')}</div>
            <div className={styles.col_4}>{_('other_dex')}</div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_1')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconX />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_2')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconX />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_3')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_4')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_5')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_6')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_7')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconX />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_8')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconX />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_9')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
          <div className={styles.list_item}>
            <div className={styles.col_1}>{_('lb_10')}</div>
            <div className={styles.col_2}>
              <IconX />
            </div>
            <div className={styles.col_3}>
              <IconTick />
            </div>
            <div className={styles.col_4}>
              <IconTick />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const isZh = _lang.toLowerCase() === 'zh-cn';
    return (
      <Layout>
        <Notice />
        <section className={styles.container}>
          <nav className={styles.head}>
            <div className={styles.head_inner}>
              <Nav />
              <div className={styles.head_right}>
                <Button
                  type="primary"
                  className={styles.cta}
                  shape="round"
                  onClick={() => {
                    history.push('swap');
                  }}
                >
                  {_('launch_app')}
                </Button>
                <div className={styles.hidden_mobile}>
                  <DarkMode />
                  <Lang />
                </div>
              </div>
            </div>
          </nav>
          <section className={styles.main}>
            <div className={styles.main_title}>{_('tokenswap')}</div>
            <div className={styles.main_desc}>{_('tokenswap_desc')}</div>
            <div className={styles.btns}>
              <Button
                type="primary"
                className={styles.btn}
                shape="round"
                style={{ marginRight: 20 }}
                onClick={() => {
                  history.push('swap');
                }}
              >
                {_('launch_app')}
              </Button>
            </div>
          </section>
          <section className={styles.content}>
            <div className={styles.title_web}>{_('comp_ts')}</div>
            <div className={styles.title_h5}>{_('comp_ts_h5')}</div>
            {this.renderList()}
          </section>
          <Footer />
        </section>
      </Layout>
    );
  }
}
