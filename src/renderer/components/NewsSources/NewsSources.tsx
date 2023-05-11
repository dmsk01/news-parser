import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';

interface INewsSources {
  sources: string[];
}

function NewsSources({ sources }: INewsSources) {
  return (
    <ul className="news-sources">
      {sources.map((src) => (
        <li key={uuidv4()}>{src}</li>
      ))}
    </ul>
  );
}

export default NewsSources;
