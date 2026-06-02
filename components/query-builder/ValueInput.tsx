"use client";

interface Props {
  type: string;

  value: any;

  onChange: (value: any) => void;

  options?: string[];
}

export default function ValueInput({
  type,

  value,

  onChange,

  options,
}: Props) {
  if (type === "enum") {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select</option>

        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (type === "number") {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }

  if (type === "date") {
    return (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}
