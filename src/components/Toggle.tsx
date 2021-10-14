import React from 'react';

interface Props {
  id: string;
  isChecked: boolean;
  label: string;
  onToggle: React.Dispatch<React.SetStateAction<boolean>>;
};

const Toggle: React.FC<Props> = ({ id, isChecked, label, onToggle }) => (
  <span className="toggle__container">
    <span className="toggle__label" id={id}>{label}</span>
    <button
      className="toggle__button"
      aria-checked={isChecked}
      aria-labelledby={id}
      role="switch"
      onClick={() => onToggle(!isChecked)}
    />
  </span>
);

export default Toggle;
