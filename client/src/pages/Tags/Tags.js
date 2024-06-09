import React from 'react';
import tagsList from './tagsData'; 
import './Tags.css';
import TagForm from './TagForm'; 

const TagPage = () => {
  return (
    <div className="tag-page"> {/* Container for the tag page */}
      <h1>Tags</h1> {/* Title for the tag page */}
      <ul className="tag-list"> {/* List of tags */}
        {/* Map over the tagsList and render a TagForm component for each tag */}
        {tagsList.map((tag) => (
          <li key={tag.id}> {/* Key prop is required when rendering a list */}
            <TagForm tag={tag} /> {/* Pass tag data as props to TagForm component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagPage;