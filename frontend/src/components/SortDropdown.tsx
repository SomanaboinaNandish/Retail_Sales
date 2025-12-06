interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: Props) {
  return (
    <select
      className="px-3 py-2 border rounded-lg bg-white text-sm shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="date-desc">Date (Newest First)</option>
      <option value="customerName-asc">Customer Name (A–Z)</option>
      <option value="quantity-desc">Quantity (High → Low)</option>
    </select>
  );
}
