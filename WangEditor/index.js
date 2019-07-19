import React, { PureComponent } from 'react';
import E from 'wangeditor';
import { generateFileRadomName, ossApi, ossUploadApi } from '@/utils/utils';
import styles from './index';

class Editor extends PureComponent {
  componentWillReceiveProps(nextProps) {
    const { initialValue: LinitialValue } = this.props;
    const { initialValue } = nextProps;
    if (initialValue !== '' && initialValue !== LinitialValue) {
      // this.editor.txt.clear();
      // this.editor.txt.append(initialValue);
      this.editor.txt.html(initialValue);
    }
  }

  // 上传图片
  uploadImageCallBack = (file, insert) => {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      const { ossData } = this.props;
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${ossUploadApi}`);
      const data = new FormData();

      Object.keys(ossData).map((key, item) => {
        data.append(`${key}`, ossData[key]);
      });
      Object.keys(ossData).map((key, item) => {
        data.append(`${key}`, ossData[key]);
      });
      const name = generateFileRadomName(file.name);
      const pathName = `file/${name}`;
      data.append(`key`, `${pathName}`);
      data.append(`name`, `${name}`);
      data.append(`success_action_status`, `200`);
      data.append('file', file);
      xhr.send(data);

      xhr.addEventListener('load', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          dispatch({
            type: 'utils/setOssAcl',
            payload: {
              code: 2,
              name: `${pathName}`,
            },
          }).then(res => {
            const formdata = {
              data: {
                link: `${ossApi}/${pathName}`,
              },
            };
            insert(`${ossApi}/${pathName}`);
            resolve(formdata);
          });
        }
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  componentDidMount = () => {
    const { elem, initialValue, onChange, editable, type } = this.props;
    const editor = new E(`#${elem}`);

    editor.customConfig.uploadFileName = 'photo';
    editor.customConfig.uploadImgServer = `//${ossApi}`;
    editor.customConfig.uploadImgMaxLength = 1;
    editor.customConfig.customUploadImg = (files, insert) => {
      this.uploadImageCallBack(files[0], insert);
    };

    editor.customConfig.menus = [
      'head', // ??
      'bold', // ??
      'fontSize', // ??
      'fontName', // ??
      'italic', // ??
      'underline', // ???
      'strikeThrough', // ???
      'foreColor', // ????
      'backColor', // ????
      'link', // ????
      'list', // ??
      'justify', // ????
      'quote', // ??
      'emoticon', // ??
      'image', // ????
      'table', // ??
      'video', // ????
      'code', // ????
    ];

    if (onChange) {
      editor.customConfig.onchange = (html) => onChange(editor.txt.html(),editor.txt.text());
    }
    editor.create();
    this.editor = editor;

    if (type === 1) {
      editor.txt.clear();
    } else {
      editor.txt.html(initialValue);
    }

    const textElem = editor.$textElem;
    editor.$toolbarElem[0].style.flexWrap = 'wrap';
    // textElem.attr('contentEditable', !editable);
    editor.config.zIndex = '1';
    if (onChange) {
      editor.change();
    }
  };

  render() {
    const { elem } = this.props;
    return <div id={elem} style={{ width: '130%', zIndex: '0' }} className={styles.container} />;
  }
}

export default Editor;
