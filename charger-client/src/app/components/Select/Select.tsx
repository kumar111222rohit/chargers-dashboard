import React from 'react';

import { StationData } from '@/app/types/charger';

import './Select.css';

interface SelectBoxProps {
  options: StationData[] | string[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  onChange,
  value,
  placeholder = 'Select an option',
}) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Select Box"
      className="select"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => {
        const label = typeof option === 'object' ? option.name : option;
        const optionValue = typeof option === 'object' ? option.id : option;
        return (
          <option key={index} value={(value = optionValue)}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

export default SelectBox;
