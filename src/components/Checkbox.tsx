import React from 'react';

interface Props {
  id: string;
  isChecked: boolean;
  label: string;
  onToggle: (a: string) => void;
  value: string;
};

const Checkbox: React.FC<Props> = ({
  id,
  isChecked,
  label,
  onToggle,
  value,
}) => (
  <label
    className={isChecked ? 'checkbox__label checkbox__label--is-checked' : 'checkbox__label'}
    htmlFor={id}
  >
    <input
      checked={isChecked}
      id={id}
      type="checkbox"
      onChange={() => onToggle(value)}
    />
    {label}
  </label>
);

export default Checkbox;
