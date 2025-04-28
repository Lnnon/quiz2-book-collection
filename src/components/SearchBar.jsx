import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={input}
        placeholder="    Search for books..."
        onChange={(e) => setInput(e.target.value)}
        className="search-container"
      />
      <button className="search-button" type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
