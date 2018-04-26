/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Link from '../../../../components/link/link';

import './timetable.css';

class TimeTable extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.array),
    onChoose: PropTypes.func,
  }
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      time: props.data || [[false, false], [false, false], [false, false], [false, false], [false, false], [false, false], [false, false]],
    });
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}
  checkNumCLick(e) {
    if (!this.props.onChoose) {
      return;
    }
    const id = e.target.getAttribute('id');
    const time = this.state.time;
    const arrIndex = id[0];
    const index = id[1];
    if (time[arrIndex][index]) {
      time[arrIndex][index] = false;
    } else {
      time[arrIndex][index] = true;
    }
    this.setState({
      ...this.state,
      time,
    });
    this.props.onChoose(time);
  }
  render() {
    const timeData = this.state.timeData;
    const time = this.state.time;
    return (
      <div className="components-timetable-container">
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">日期</div>
          <div className="components-timetable-main-container-item">上午</div>
          <div className="components-timetable-main-container-item">下午</div>
        </div>
        <div className="line1px" />
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期一</div>

          <div className="components-timetable-main-container-item">
            <label htmlFor="00">
              <input id="00" checked={time[0][0]} type="checkbox" /><i id="00" onClick={this.checkNumCLick} >✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="01">
              <input checked={time[0][1]} type="checkbox" /><i id="01" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期二</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="10">
              <input id="10" checked={time[1][0]} type="checkbox" /><i onClick={this.checkNumCLick} t id="10">✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="11">
              <input id="11" checked={time[1][1]} type="checkbox" /><i onClick={this.checkNumCLick} id="11">✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期三</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="20">
              <input id="20" checked={time[2][0]} type="checkbox" /><i id="20" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="21">
              <input id="21" checked={time[2][1]} type="checkbox" /><i onClick={this.checkNumCLick} id="21">✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期四</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="30">
              <input id="30" checked={time[3][0]} type="checkbox" /><i onClick={this.checkNumCLick} id="30">✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="31">
              <input id="31" checked={time[3][1]} type="checkbox" /><i onClick={this.checkNumCLick} id="31">✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期五</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="40">
              <input id="40" checked={time[4][0]} type="checkbox" /><i onClick={this.checkNumCLick} id="40">✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="41">
              <input id="41" checked={time[4][1]} type="checkbox" /><i id="41" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期六</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="50">
              <input id="50" checked={time[5][0]} type="checkbox" /><i id="50" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="51">
              <input id="51" checked={time[5][1]} type="checkbox" /><i id="51" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
        </div>
        <div className="components-timetable-main-container">
          <div className="components-timetable-main-container-item">星期日</div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="60">
              <input id="60" checked={time[6][0]} type="checkbox" /><i id="60" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
          <div className="components-timetable-main-container-item">
            <label htmlFor="61">
              <input id="61" checked={time[6][1]} type="checkbox" /><i id="61" onClick={this.checkNumCLick}>✓</i>
            </label>
          </div>
        </div>
      </div>

    );
  }
}

export default TimeTable;
