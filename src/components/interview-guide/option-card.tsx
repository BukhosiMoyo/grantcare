"use client";

/**
 * Large tappable option card for single-select questions.
 * Shows a keyboard shortcut key (A, B, C, D) and auto-advances on selection.
 */
export function OptionCard({
  label,
  shortcutKey,
  selected,
  onClick,
}: {
  label: string;
  shortcutKey: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="option-card"
      data-selected={selected}
      onClick={onClick}
    >
      <span className="option-card-key">{shortcutKey}</span>
      <span className="option-card-label">{label}</span>
    </button>
  );
}

/**
 * Group of option cards for a single-select question.
 */
export function OptionGroup({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const keys = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="flow-options">
      {options.map((opt, i) => (
        <OptionCard
          key={opt.value}
          label={opt.label}
          shortcutKey={keys[i] ?? String(i + 1)}
          selected={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
