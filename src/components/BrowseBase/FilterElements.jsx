import React, { Component } from "react";
import { Input } from "reactstrap";
import DatePicker from 'react-datepicker'
import { format as formatDate, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css"

export class FilterElements extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      filter: props.filters[0]
    };

    this.previousValue = this.state.value;
    this.previousFilter = this.state.filter;
  }

  startInterval = () => {
    this.interval = setInterval(() => {

      const { value, filter } = this.state;

      if (value !== this.previousValue || filter !== this.previousFilter) {
        this.props.fetchElements(value, filter.value);
        this.previousValue = value;
        this.previousFilter = filter;
      }
    }, 1000);
  };

  resetInterval = () => {
    clearInterval(this.interval);
    this.startInterval();
  };

  renderInput = () => {
    switch (this.state.filter.type) {
      case 'date':
        return (
          <div style={{ flex: 3 }}>
            <DatePicker
              customInput={<CustomDatePickerInput />}
              selected={new Date(this.state.value || Date.now())}
              onChange={e => this.setState({ value: formatDate(addDays(e, 1), 'YYYY-MM-DD') })}
            />
          </div>
        )
      default:
        return (
          <Input
            style={{ flex: 3 }}
            onChange={e => {
              this.setState({ value: e.target.value });
              this.resetInterval();
            }}
            value={this.state.value}
          />
        )
    }
  }

  render = () =>
    <div style={{ display: 'flex' }}>
      {this.renderInput()}
      <Input
        style={{ flex: 1, marginLeft: 10 }}
        type='select'
        onChange={e => {
          this.setState({
            value: '',
            filter: this.props.filters.find(filter => filter.value == e.target.value)
          });
          this.resetInterval();
        }}
        value={this.state.type}
      >
        {this.props.filters.map(filter => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
      </Input>
    </div>;
}

class CustomDatePickerInput extends React.Component {

  render() {
    return (
      <Input
        onClick={this.props.onClick}
        style={{ width: '100%' }}
        value={this.props.value}
        onChange={() => { }}
      />
    )
  }
}