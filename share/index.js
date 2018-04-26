/* global wx:false */

import Alert from 'react-s-alert';
import { USING_HISTORY_HASH } from '../../pages/history';

/*
 * window.orgInfo 由后端直接输出到页面中
 * {
 *    name: '',
 *    logo: '',
 *    module_setting: [[]]
 * }
 */


const WXS = (option = {}) => {
  if (!window.wx) {
    return;
  }
  const orgInfo = window.orgInfo || {
    name: '志多星',
    logo: '',
  };
  const host = `${location.protocol}//${location.hostname}`;
  let shareUrl = location.href;

  // 使用 HASH 的环境下分享出去的链接转换成 path 形式，否则有可能有兼容性问题（分享不出去 hash）
  if (USING_HISTORY_HASH
    && location.pathname === '/'
    && location.hash.length > 2
    && location.hash.indexOf('#/') === 0) {
    shareUrl = `${location.protocol}//${location.host}/${location.hash.replace(/^#\//g, '')}`;
  }

  const newOption = {
    title: `${option.title || orgInfo.name}`,
    desc: option.desc || '文明点亮你我，志愿感动社会',
    // link: `${host}${option.link || ''}`,
    link: shareUrl,
    imgUrl: option.image || orgInfo.logo || `${host}/images/icon.png`,
    success: () => {
      Alert.success('分享成功');
      if (option.success) {
        option.success();
      }
    },
  };

  console.log('微信分享设置:', newOption);

  [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
  ].forEach(share => wx[share](newOption));
};

export default WXS;
