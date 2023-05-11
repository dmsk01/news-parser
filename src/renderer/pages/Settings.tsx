import React from 'react';
import { Link } from 'react-router-dom';
import NewsSources from 'renderer/components/NewsSources/NewsSources';

const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

function Settings() {
  return (
    <div>
      Settings page
      <NewsSources sources={rssSources} />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Settings;
