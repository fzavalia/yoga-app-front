import React, { Component } from "react";
import { Input } from "reactstrap";

export class FilterElements extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      type: props.filters[0].value
    };

    this.previousValue = this.state.value;
    this.previousType = this.state.type;
  }

  startInterval = () => {
    this.interval = setInterval(() => {

      const { value, type } = this.state;

      if (value !== this.previousValue || type !== this.previousType) {
        this.props.fetchElements(value, type);
        this.previousValue = value;
        this.previousType = type;
      }
    }, 1000);
  };

  resetInterval = () => {
    clearInterval(this.interval);
    this.startInterval();
  };

  render = () =>
    <div style={{ display: 'flex' }}>
      <Input
        style={{ flex: 3 }}
        onChange={e => {
          this.setState({ value: e.target.value });
          this.resetInterval();
        }}
        value={this.state.value}
      />
      <Input
        style={{ flex: 1, marginLeft: 10 }}
        type='select'
        onChange={e => {
          this.setState({ type: e.target.value });
          this.resetInterval();
        }}
        value={this.state.type}
      >
        {this.props.filters.map(filter => <option key={filter.value} value={filter.value}>{filter.label}</option>)}
      </Input>
    </div>;
}
