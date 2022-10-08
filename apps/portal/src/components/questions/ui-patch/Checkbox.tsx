import { useId } from 'react';

export type CheckboxProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  const id = useId();
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
        id={id}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <label className="ml-3 min-w-0 flex-1 text-gray-700" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
