/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-filename-extension */
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import Iconfont from '@/components/IconFonts';
import React, { Component, Fragment } from 'react';
import { Button } from 'antd';
import styles from './index.less';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {}

  render() {
    const { type, style, content, htmlType ,onClick,href} = this.props;
    const newProps = {
    };
    if (htmlType) {
      newProps.htmlType = htmlType;
    }
    if (type) {
      newProps.type = type;
    }
    if (style) {
      newProps.style = style;
    }
    if (onClick) {
      newProps.onClick = onClick;
    }
    if (href) {
      newProps.href = href;
    }
    return (
      <div className={styles.container}>
        <Button {...newProps}>
          {content || ''}
        </Button>
      </div>
    );
  }
}
export default Nav;
