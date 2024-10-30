const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with: <input value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
    </div>
  )
}

export default Filter;
