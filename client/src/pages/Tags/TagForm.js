import React from 'react';

const TagForm = ({ tag }) => {
  return (
    <div className="tag-item">
      <h2>{tag.tagName}</h2>
      <p>{tag.tagDesc}</p>
    </div>
  );
};

export default TagForm;