import React from 'react';
import tagsList from './tagsData'; 
import './Tags.css';
import TagForm from './TagForm'; 

const TagPage = () => {
  return (
    <div className="tag-page">
      <h1>Tags</h1>
      <ul className="tag-list">
        {tagsList.map((tag) => (
          <li key={tag.id}>
            <TagForm tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagPage;