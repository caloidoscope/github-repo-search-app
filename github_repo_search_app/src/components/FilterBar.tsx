import { useState } from "react";

interface FilterBarProps {
  onFilter: (filterQuery:string) => void
}

const FilterBar: React.FC<FilterBarProps>= ({ onFilter }) => {
  const [filterQuery, setFilterQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterQuery(event.target.value)
    onFilter(event.target.value)
  }

  return (
      <input
        className="mt-2 border text-sm rounded-lg block w-full p-2.5"
        type="text"
        placeholder="Filter repositories"
        value={filterQuery}
        onChange={(e) => handleChange(e)}
      />
  );
};


export default FilterBar;