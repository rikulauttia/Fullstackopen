import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        placeholder="Enter country name"
      />
    </div>
  );
};

export default Search;
