"use client";

interface Props {
  type: string;
  value: any;
  onChange: (value: any) => void;
  options?: string[];
  className?: string;
}

export default function ValueInput({
  type,
  value,
  onChange,
  options,
  className,
}: Props) {
  if (type === "enum") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      >
        <option value="">Select value</option>

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
        placeholder="Enter number"
        onChange={(e) => onChange(Number(e.target.value))}
        className={className}
      />
    );
  }

  if (type === "date") {
    return (
      <input
      
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    );
  }

  return (
    <input
      value={value}
      placeholder="Enter value"
      onChange={(e) => onChange(e.target.value)}
      className="bg-white text-[#06110d] dark:bg-[#020807] dark:text-white"
    />
  );
}