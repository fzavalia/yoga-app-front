import React, { Component } from "react";
import { Input } from "reactstrap";
import DatePicker from 'react-datepicker'
import { format as formatDate, } from "date-fns";
import Select from 'react-select'
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

  componentDidUpdate = (prevProps) => {
    if (prevProps.filters != this.props.filters) {
      this.setState({ filter: this.props.filters.find(filter => filter.value === this.state.filter.value) })
    }
  }

  startFilterTimer = () => {
    this.timeout = setTimeout(() => {
      let { value, filter } = this.state;
      if (value !== this.previousValue || filter !== this.previousFilter) {
        this.previousValue = value;
        this.previousFilter = filter;
        if (this.state.filter.type === 'date') {
          value = formatDate(value, 'YYYY-MM-DD')
        }
        this.props.fetchElements(value, filter.value);
      }
    }, 1000);
  };

  resetFilterTimer = () => {
    clearTimeout(this.timeout);
    this.startFilterTimer();
  };

  renderDatePickerInput = () =>
    <div style={{ flex: 3 }}>
      <DatePicker
        customInput={<CustomDatePickerInput />}
        selected={new Date(this.state.value || Date.now())}
        onChange={e => {
          this.setState({ value: e })
          this.resetFilterTimer()
        }}
      />
    </div>

  renderSelectInput = () =>
    <Select
      styles={{ container: (base) => ({ ...base, flex: 3 }), control: (base) => ({ ...base, height: '100%' }) }}
      options={[{ value: '', label: 'Todos' }].concat(this.state.filter.options)}
      onChange={e => {
        this.setState({ value: e.value })
        this.resetFilterTimer()
      }}
    />

  renderDefaultInput = () =>
    <Input
      style={{ flex: 3 }}
      onChange={e => {
        this.setState({ value: e.target.value });
        this.resetFilterTimer();
      }}
      value={this.state.value}
    />

  renderInput = () => {
    switch (this.state.filter.type) {
      case 'date':
        return this.renderDatePickerInput()
      case 'select':
        return this.renderSelectInput()
      default:
        return this.renderDefaultInput()
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
          this.resetFilterTimer();
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