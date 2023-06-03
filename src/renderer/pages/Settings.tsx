import React from 'react';
import AddRssForm from 'renderer/components/AddRssForm/AddRssForm';
import NewsFeeds from 'renderer/components/NewsFeeds/NewsFeeds';
import NewsSourcesList from 'renderer/components/NewsSourcesList/NewsSourcesList';

const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

function Settings() {
  return (
    <>
      <NewsFeeds />
    </>
  );
}

export default Settings;
