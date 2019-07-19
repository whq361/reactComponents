/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-multi-comp */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Icon } from 'antd';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptUrl: '//at.alicdn.com/t/font_1234253_oetevleug09.js',
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { scriptUrl } = this.state;
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl,
    });
    return <IconFont {...this.props} />;
  }
}
