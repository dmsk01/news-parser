import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './style.scss';
import { useSelector } from 'react-redux';
import { ISettingsState } from 'renderer/store/settingsSlice';

interface INewsSources {
  sources: string[];
}

function NewsSources() {
  const sources = useSelector(
    (state: { settings: ISettingsState }) => state.settings.sources
  );

  return (
    <ul className="news-sources">
      {sources.map((src) => (
        <li key={uuidv4()}>{src}</li>
      ))}
    </ul>
  );
}

export default NewsSources;
