import React from 'react';
import AddRssForm from 'renderer/components/AddRssForm/AddRssForm';
import ExportSettings from 'renderer/components/ExportSettings/ExportSettings';
import NewsFeeds from 'renderer/components/NewsFeeds/NewsFeeds';
import NewsSourcesList from 'renderer/components/NewsSourcesList/NewsSourcesList';

function Settings() {
  return (
    <>
      <NewsFeeds />
      <ExportSettings />
    </>
  );
}

export default Settings;
