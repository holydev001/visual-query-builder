"use client";

import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function ThemedSelect({
  value,
  options,
  onChange,
  className = "",
  disabled = false,
}: Props) {
  return (
    <div className={`relative min-w-[140px] ${className}`}>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="
          h-10
          w-full
          appearance-none
          border
          border-black/10
          bg-[#f8faf8]
          px-3
          pr-9
          text-sm
          font-medium
          text-[#06110d]
          outline-none
          transition
          duration-300

          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-500/20

          disabled:cursor-not-allowed
          disabled:opacity-50

          dark:border-white/10
          dark:bg-[#020807]
          dark:text-white
          dark:focus:border-emerald-400
          dark:focus:ring-emerald-400/20
        "
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="
              bg-white
              text-[#06110d]

              dark:bg-[#020807]
              dark:text-white
            "
          >
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2

          text-black/45
          dark:text-white/45
        "
      />
    </div>
  );
}
