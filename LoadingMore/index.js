/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-filename-extension */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import Iconfont from '@/components/IconFonts';
import { BasicLayout as ProLayoutComponents } from '@ant-design/pro-layout';
import styles from './index.less';

export default  class Nav extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {

    return (
      <div className={styles.container}>
        <Iconfont type='iconicn_loading' className={styles.icon} />
      </div>
      
    );
  }
}
