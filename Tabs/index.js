/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import styles from './index';


const cx = classNames.bind(styles);
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex || 0,
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  // handleFilterHeaderClick(optionType) {
  //   return () => {};
  // }

  handleTabSelected(idx) {
    return () => {
      const { selectedIndex } = this.state;

      if (idx === selectedIndex) {
        return;
      }

      this.setState(
        {
          ...this.state,
          selectedIndex: idx,
        },
        () => {
          if (this.props.onChange) {
            this.props.onChange(idx, selectedIndex);
          }
        },
      );
    };
  }

  render() {
    const { selectedIndex } = this.state;
    const { children } = this.props;

    // const cls = classNames(styles.ellipsis, className, {
    //     [styles.lines]: lines && !isSupportLineClamp,
    //     [styles.lineClamp]: lines && isSupportLineClamp,
    //   });

    //   const cls = classNames(styles.ellipsis, className, {
    //     [styles.lines]: lines && !isSupportLineClamp,
    //     [styles.lineClamp]: lines && isSupportLineClamp,
    //   });

    // console.log(cls)

    //   if (!lines && !length) {
    //     return (
    //       <span className={cls} {...restProps}>
    //         {children}
    //       </span>
    //     );
    //   }
      console.log(styles)
    return (
      <div className={styles.componentTab}>
        <div className={cx('tabHeader')}>
          <ul className={styles.tabs}>
            {children.map((tab, idx) => {
              console.log(idx);
                console.log(selectedIndex);
                console.log(idx == selectedIndex)
              const inputClass = classNames({
                [styles.selected]: idx == selectedIndex,
              });
              console.log(inputClass)
              const cls =  cx({ selected: idx == selectedIndex  });
              console.log(cls);
              return (
                <li key={idx} className={idx === selectedIndex ? cx('selected') : ''}>
                  <a onClick={this.handleTabSelected(idx)}>{tab.props.name}</a>
                </li>
              );
            })}
          </ul>
          <div className="line1px" />
        </div>
        {children.map((tab, idx) => {
          return (
            <div
              key={idx}
              className={classNames({ tabPanel: true, tabPanelShow: idx === selectedIndex })}
            >
              {tab.props.children}
            </div>
          );
        })}
      </div>
    );
  }
}

Tab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      component: PropTypes.object,
    }),
  ),
  onChange: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default Tab;
