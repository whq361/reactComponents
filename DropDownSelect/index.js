import { Menu, Dropdown, Icon, Badge } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
// type == 1为是否选项
// key 为上传字段
export default class DropDownSelect extends React.Component {
  static contextTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.number,
    keys: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    refreshFuc: PropTypes.func,
  };

  state = {
    visible: false,
  };

  handleMenuClick = e => {
    const { type, keys, refreshFuc,id } = this.props;
    if (type == 1) {
      // e.item.props.status
  
      const keyValue = {};
      keyValue[keys] = e.item.props.status;
      keyValue.id = id;
      refreshFuc && refreshFuc(keyValue);
    }
  };

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
      
  };

  menuTitle = value => {
    if (this.props.type == 1) {
      switch (Boolean(value)) {
        case true:
          return '是';
        case false:
          return '否';
      }
    } else {
      switch (Number(value)) {
        case 0:
          return '进行中';
        case 10:
          return '成功的';
        case 20:
          return '暂停的';
        case 30:
          return '失败的';
        case 40:
          return '已取消';
      }
    }
  };

  menuStatus = value => {
    if (this.props.type == 1) {
      switch (Boolean(value)) {
        case true:
          return 'processing';
        case false:
          return 'error';
      }
    } else {
      switch (Number(value)) {
        case 0:
          return 'processing';
        case 10:
          return 'success';
        case 20:
          return 'warning';
        case 30:
          return 'error';
        case 40:
          return 'default';
        default:
          return 'default';
      }
    }
  };

  render() {
    let menu = null;
    
    const { refreshFuc, type } = this.props;
    if (this.props.type == 1) {
      menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item status>是</Menu.Item>
          <Menu.Item status={false}>否</Menu.Item>
        </Menu>
      );
    }
    const { value } = this.props;

    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
        disabled={!refreshFuc}
        trigger={refreshFuc?['hover']:[]}
      >
        <Badge status={this.menuStatus(value)} text={this.menuTitle(value)} />
      </Dropdown>
    );
  }
}
