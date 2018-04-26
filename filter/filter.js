/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './filter.css';

export const TYPES = ['最新发布', '距离最近', '热门活动'];
export const TYPES_VALUE = ['time', 'distance', 'recommend'];

class Filter extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.filterConfig = {
      types: TYPES,
      categories: window.serviceCategory,
      objects: window.serviceTarget,
    };

    this.state = {
      showOptionsType: '',
      selectedOption: {
        types: this.filterConfig.types[props.type] || '',
        categories: window.serviceCategory[props.category] || '',
        objects: window.serviceTarget[props.target] || '',
      },
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  handleFilterHeaderClick(optionType) {
    return () => this.setState({
      ...this.state,
      showOptionsType: this.state.showOptionsType === optionType ? '' : optionType,
    }, () => {
      if (this.state.showOptionsType) {
        this.props.onFilterShow();
      } else {
        this.props.onFilterHide();
      }
    });
  }

  handleOptionSelected(optionType, option) {
    return () => {
      this.setState({
        ...this.state,
        showOptionsType: '',
        selectedOption: {
          ...this.state.selectedOption,
          [optionType]: option === this.state.selectedOption[optionType] ? '' : option,
        },
      }, () => {
        const { types, categories, objects } = this.state.selectedOption;
        this.props.onFilterChange({
          type: types ? this.filterConfig.types.indexOf(types) : 1000,
          category: categories ? this.filterConfig.categories.indexOf(categories) : 1000,
          target: objects ? this.filterConfig.objects.indexOf(objects) : 1000,
        });
        this.props.onFilterHide();
      });
    };
  }

  renderFilterOptionis(optionType) {
    const options = this.filterConfig[optionType];

    if (!options) {
      return null;
    }

    const selectedOption = this.state.selectedOption[optionType];

    return (
      <ul className="filter-optioins">
        {
          options.map(
            (option, idx) =>
              <li key={idx} className={classnames({ selected: selectedOption === option })}>
                <a onClick={this.handleOptionSelected(optionType, option)}>{option}</a>
                <div className="line1px" />
              </li>)
        }
      </ul>
    );
  }

  render() {
    const { showOptionsType, selectedOption } = this.state;
    const selectedType = selectedOption.types || '智能排序';
    const selectedCategory = selectedOption.categories || '服务类型';
    const selectedObject = selectedOption.objects || '服务对象';

    return (
      <div className="component-project-filter">
        <div className="filter-header">
          {/** line1px-top */}
          <div className="line1px line1px-top" />
          <div className="filter-actions">
            <a className={classnames({ opened: showOptionsType === 'types' })} onClick={this.handleFilterHeaderClick('types')}>
              <span>{selectedType}</span>
            </a>
            <div className="line1px-v" />
            <a className={classnames({ opened: showOptionsType === 'categories' })} onClick={this.handleFilterHeaderClick('categories')}>
              <span>{selectedCategory}</span>
            </a>
            <div className="line1px-v" />
            <a className={classnames({ opened: showOptionsType === 'objects' })} onClick={this.handleFilterHeaderClick('objects')}>
              <span>{selectedObject}</span>
            </a>
          </div>
          <div className="line1px line1px-bottom" />
        </div>
        {this.renderFilterOptionis(showOptionsType)}
        {showOptionsType ? <div className="filter-mask" /> : null}
      </div>
    );
  }
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onFilterShow: PropTypes.func,
  onFilterHide: PropTypes.func,
  type: PropTypes.number,
  category: PropTypes.number,
  target: PropTypes.number,
};

export default Filter;
