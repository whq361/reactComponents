import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './avatar.css';


class Avatar extends React.Component {

  static propTypes = {
    src: PropTypes.string,
    defaultSrc: PropTypes.string,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      radius: PropTypes.number,
    }),
  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.logoSrc = '/images/my/register.png';

    this.state = {
      src: this.configSrc(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      src: this.configSrc(nextProps),
    });
  }

  configSrc(props) {
    let src = props.src || props.defaultSrc || this.logoSrc;
    const size = (props.size || []);
    const { width, height } = size;
    const resizeWidth = width || height;

    if (resizeWidth) {
      // 确保 server 端返回不变形，所以只指定 width
      src = `${src}?${resizeWidth * 3 || 0}x0`;
    }
    return src;
  }

  render() {
    const src = this.state.src;
    const width = this.props.size.width;
    const height = this.props.size.height;
    const radius = this.props.size.radius;
    const props = {
      ...this.props,
    };

    delete props.src;
    delete props.size;
    delete props.defaultSrc;

    return (<div
      {...props}
      style={{ backgroundImage: `url(${src})`,
        width: `${width || height || 20}px`,
        height: `${height || width || 20}px`,
        borderRadius: `${radius || (width || height) / 2}px`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover' }}
    />);
  }

}

export default Avatar;
