interface SearchBarProps {
  onChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="flex items-center justify-center">
      <input
        className="border rounded-lg py-2 px-4"
        type="text"
        placeholder="Search"
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar