import autoBind from 'react-autobind';
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './star.css';


class Star extends React.Component {

  static propTypes = {
    size: PropTypes.shape({
      score: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    onChoose: PropTypes.func,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      arr: [0, 0, 0, 0, 0],
    });
  }
  renderTemplate() {
    let score = parseFloat(this.props.size.score);
    if(isNaN(score)){
      return null
    }
    const props = {
      ...this.props,
    };
    if (score == 0) {
      score = 1.10;
    }
    const round = score.toFixed(1);
    // 取整数部分,全图部分
    const integer = round.toString().split('.')[0];
    // 取小数第一位，判断是否>5.是否显示半图
    // let decimal = 0;
    // if (round >= 0) {
    const decimal = round.toString().split('.')[1][0];
    // }
    // 空图部分
    const emptyNum = 5 - Math.round(score);
    const integerArr = [];
    const emptyArr = [];
    for (let i = 0; i < integer; i++) {
      integerArr.push(i);
    }
    for (let i = Math.round(score); i < 5; i++) {
      emptyArr.push(i);
    }
    const width = this.props.size.width;
    const height = this.props.size.height;
    return (
      <div {...props}>
        <ul className="components-star">
          {
            integerArr.length > 0 && integerArr.map(item =>
              <li key={item}>
                <div
                  style={{ width, height }}
                  className={classnames({
                    'components-star-light': true,
                  })}
                />
              </li>)
          }
          {
            decimal && decimal >= 5 ?
              <li>
                <div
                  style={{ width, height }}
                  className={classnames({
                    'components-star-half': true,
                  })}
                />
              </li> : null
          }
          {
            emptyArr.length > 0 && emptyArr.map(item =>
              <li key={item}>
                <div
                  style={{ width, height }}
                  className={classnames({
                    'components-star-empty': true,
                  })}

                />
              </li>)
          }
        </ul>
      </div>
    );
  }
  onClick(e) {
    let num = Number(e.target.id);
    num += 1;
    const newArr = new Array(num);
    for (let a = 0; a < num; a++) {
      newArr[a] = 1;
    }
    for (let a = 0; a < 5 - num; a++) {
      newArr.push(0);
    }

    this.setState({
      arr: newArr,
    });
    if(this.props.onChoose){
    	 this.props.onChoose(newArr);
    }
  }

  renderClick() {
    const width = this.props.size.width;
    const height = this.props.size.height;
    const arr = this.state.arr;


    return (
      <div>
        <ul className="components-star">
          {
            arr.map((item, index) => {
              const ite = item;
              return (
                <li key={index} >
                  <div
                    id={index}
                    style={{ width, height }}
                    className={classnames({
                      'components-star-light': ite,
                      'components-star-empty': !ite,
                    })}
                    onClick={this.onClick}
                  />
                </li>
              );
            },

            )
          }


        </ul>
      </div>
    );
  }
  render() {
    return (
      <div>{this.props.onChoose ? this.renderClick() : this.renderTemplate()}</div>
    );
  }
}

export default Star;
