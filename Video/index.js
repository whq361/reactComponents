/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-filename-extension */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Avatar } from 'antd';

import IconFont from '@/components/IconFonts/index';
import { Player, BigPlayButton } from 'video-react';
import styles from './index.less';

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { isPlayIng ,src} = this.props;
    return (
      <div className={styles.videoContainer}>
        <Player
          playsInline
          poster="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=658100708,1067862941&fm=26&gp=0.jpg"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        >
          <BigPlayButton position="center" />
          {/* <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" /> */}
        </Player>
      </div>
    );
  }
}
export default Container;
