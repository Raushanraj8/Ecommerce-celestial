import { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  category: string[];
  size: number[];
  color: string[];
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    size: [],
    color: [],
  });

  const handleFilterChange = (type: keyof FilterState, value: string | number) => {
    setFilters((prevFilters: FilterState) => {
      const updatedFilters = { ...prevFilters };

      // Handle the type-specific logic separately for string[] and number[]
      if (type === 'category' || type === 'color') {
        const typeArray = updatedFilters[type] as string[];
        if (typeArray.includes(value as string)) {
          updatedFilters[type] = typeArray.filter((item) => item !== value);
        } else {
          updatedFilters[type] = [...typeArray, value as string];
        }
      } else if (type === 'size') {
        const typeArray = updatedFilters[type] as number[];
        if (typeArray.includes(value as number)) {
          updatedFilters[type] = typeArray.filter((item) => item !== value);
        } else {
          updatedFilters[type] = [...typeArray, value as number];
        }
      }

      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          <div className="space-y-2">
            {['Men', 'Women'].map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.category.includes(category)}
                  onChange={() => handleFilterChange('category', category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <div className="grid grid-cols-3 gap-2">
            {[6, 7, 8, 9, 10, 11, 12].map((size) => (
              <button
                key={size}
                className={`border rounded px-2 py-1 ${
                  filters.size.includes(size) ? 'bg-black text-white' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleFilterChange('size', size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="space-y-2">
            {['Black', 'White', 'Red', 'Blue', 'Green', 'Gray'].map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.color.includes(color)}
                  onChange={() => handleFilterChange('color', color)}
                />
                {color}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
