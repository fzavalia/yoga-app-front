import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  InputContainer,
  InputName,
  CustomDatePickerInput
} from "../FormBuilder/FormBuilder";
import Input from "../FormBuilder/Input";
import Select from "../FormBuilder/Select";
import api from "../../modules/api";
import { OrderType } from "../../modules/api/core/QueryStringBuilder";

export enum FilterType {
  TEXT,
  MONTH,
  SELECT,
  SELECT_STUDENT
}

export interface FilterDefinition {
  name: string;
  label: string;
  type?: FilterType;
  options?: { value: any; label: string }[];
}

interface FilterProps {
  filter: FilterDefinition;
  onChange: (newFilterValue: any) => void;
}

interface StudentOption {
  value: any;
  label: string;
}

const Filter = (props: FilterProps) => {
  const { filter, onChange } = props;

  const [currentValue, setCurrentValue] = useState<any>();
  const [studentOptions, setStudentOptions] = useState<StudentOption[]>([]);

  useEffect(() => {
    if (filter.type === FilterType.SELECT_STUDENT) {
      api.student
        .list({ order: { by: "name", type: OrderType.ASC } })
        .then(res => {
          setStudentOptions(res.map(x => ({ value: x.id, label: x.name })));
        });
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentValue !== undefined) {
        onChange(currentValue);
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentValue]);

  switch (filter.type) {
    case FilterType.MONTH:
      return (
        <DatePicker
          selected={currentValue}
          onChange={date => setCurrentValue(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          customInput={<CustomDatePickerInput emptyLabel="Seleccione el Mes" />}
          isClearable
        />
      );
    case FilterType.SELECT:
      return (
        <InputContainer>
          <InputName>{filter.label}</InputName>
          <Select
            name={filter.name}
            value={currentValue}
            options={filter.options || []}
            onChange={(_, v) => setCurrentValue(v)}
          />
        </InputContainer>
      );
    case FilterType.SELECT_STUDENT:
      return (
        <InputContainer>
          <InputName>{filter.label}</InputName>
          <Select
            name={filter.name}
            value={currentValue}
            options={studentOptions}
            onChange={(_, v) => setCurrentValue(v)}
          />
        </InputContainer>
      );
    default:
      return (
        <InputContainer>
          <InputName>{filter.label}</InputName>
          <Input
            name={filter.name}
            value={currentValue}
            type="text"
            onChange={(_, v) => setCurrentValue(v)}
          />
        </InputContainer>
      );
  }
};

export default Filter;
