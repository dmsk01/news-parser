import React from 'react';
import { Link } from 'react-router-dom';
import AddForm from 'renderer/components/AddForm/AddForm';
import AppLayout from 'renderer/components/AppLayout/AppLayout';
import NewsSources from 'renderer/components/NewsSources/NewsSources';

const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

function Settings() {
  return (
    <div>
      <NewsSources />
      <AddForm />
    </div>
  );
}

export default Settings;
