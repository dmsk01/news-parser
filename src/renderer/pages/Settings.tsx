import React from 'react';
import AddRssForm from 'renderer/components/AddRssForm/AddRssForm';
import NewsFeed from 'renderer/components/NewsFeed/NewsFeed';
import NewsSourcesList from 'renderer/components/NewsSourcesList/NewsSourcesList';

const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

function Settings() {
  return (
    <>
      <NewsFeed />
      <NewsSourcesList />
      <AddRssForm />
    </>
  );
}

export default Settings;
