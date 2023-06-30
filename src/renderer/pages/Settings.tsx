import React from 'react';
import AddRssForm from 'renderer/components/AddRssForm/AddRssForm';
import ExportSettings from 'renderer/components/ExportSettings/ExportSettings';
import NewsFeeds from 'renderer/components/NewsFeeds/NewsFeeds';
import NewsSourcesList from 'renderer/components/NewsSourcesList/NewsSourcesList';
import TimeBreakpoints from 'renderer/components/TimeBreakpoints/TimeBreakpoints';

function Settings() {
  return (
    <>
      <NewsFeeds />
      <ExportSettings />
      <TimeBreakpoints />
    </>
  );
}

export default Settings;
