import React from 'react';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const OptionCheckbox: React.FC<Props> = ({
  checked,
  onChange,
  label,
}) => (
  <label className="neo-container block cursor-pointer">
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="neo-checkbox"
      />
      <span className="font-bold text-lg text-primary-text">{label}</span>
    </div>
  </label>
);
