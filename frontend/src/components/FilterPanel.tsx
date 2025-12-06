import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { SalesFilters } from "../services/api";

interface Props {
  filters: SalesFilters;
  filterOptions: any;
  onFiltersChange: (updated: SalesFilters) => void;
}

export function FilterPanel({ filters, filterOptions, onFiltersChange }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  if (!filterOptions?.regions) {
    return <div className="text-gray-400 text-sm">Loading filters...</div>;
  }

  const toggleMenu = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const updateFilter = (key: keyof SalesFilters, value: string) => {
    const previous = Array.isArray(filters[key]) ? (filters[key] as string[]) : [];
    const updated = previous.includes(value)
      ? previous.filter(v => v !== value)
      : [...previous, value];

    onFiltersChange({ ...filters, [key]: updated });
  };

  const filterButtons = [
    { key: "customerRegion", label: "Region", options: filterOptions.regions },
    { key: "gender", label: "Gender", options: filterOptions.genders },
    { key: "productCategory", label: "Category", options: filterOptions.categories },
    { key: "paymentMethod", label: "Payment", options: filterOptions.paymentMethods },
    { key: "tags", label: "Tags", options: filterOptions.tags },
  ];

  return (
    <div className="flex flex-wrap gap-3 relative">
      {filterButtons.map(({ key, label, options }) => {
        const current = filters[key as keyof SalesFilters];
        const selectedCount = Array.isArray(current) ? current.length : 0;

        return (
          <div key={key} className="relative">
            {/* Button */}
            <button
              onClick={() => toggleMenu(key)}
              className="px-3 py-2 text-sm bg-white border rounded-lg flex items-center gap-2 shadow-sm hover:bg-gray-50"
            >
              {label}
              {selectedCount > 0 && (
                <span className="bg-blue-600 text-white rounded-full text-xs px-2">
                  {selectedCount}
                </span>
              )}
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            {open === key && (
              <div className="absolute z-20 mt-2 w-48 bg-white border shadow-lg rounded-md py-2">
                {options.map((value: string) => {
                  const isActive =
                    Array.isArray(current) && current.includes(value);

                  return (
                    <label
                      key={value}
                      className="flex items-center gap-2 px-3 py-1 text-sm cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() =>
                          updateFilter(key as keyof SalesFilters, value)
                        }
                      />
                      {value}
                    </label>
                  );
                })}

                <div className="px-3 py-2 text-right border-t">
                  <button
                    onClick={() => onFiltersChange({ ...filters, [key]: [] })}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
