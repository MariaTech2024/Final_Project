import React, { useState } from 'react';

const TagForm = ({ tag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., updating tag, making API call, etc.)
    console.log(`Form submitted for tag: ${tag.tagName} with value: ${inputValue}`);
    setInputValue('');
  };

  return (
    <div className="tag-item">
      <h2>{tag.tagName}</h2>
      <p>{tag.tagDesc}</p>
      <form className="tag-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Update ${tag.tagName}`}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default TagForm;