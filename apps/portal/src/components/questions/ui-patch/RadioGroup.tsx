export type RadioProps = {
  onChange: (value: string) => void;
  radioData: Array<RadioData>;
};

export type RadioData = {
  checked: boolean;
  label: string;
  value: string;
};

export default function RadioGroup({ radioData, onChange }: RadioProps) {
  return (
    <div className="mx-1 space-y-1">
      {radioData.map((radio) => (
        <div key={radio.value} className="flex items-center">
          <input
            checked={radio.checked}
            className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
            type="radio"
            value={radio.value}
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              onChange(target.value);
            }}
          />
          <label
            className="ml-3 min-w-0 flex-1 text-gray-700"
            htmlFor={radio.value}>
            {radio.label}
          </label>
        </div>
      ))}
    </div>
  );
}
