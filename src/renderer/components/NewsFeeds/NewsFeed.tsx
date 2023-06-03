import React from 'react';
import { Divider } from 'antd';
import NewsSourcesList from '../NewsSourcesList/NewsSourcesList';
import AddRssForm from '../AddRssForm/AddRssForm';
import AddKeywordForm from '../AddKeywordForm/AddKeywordForm';
import NewsKeywordList from '../NewsKeywordList/NewsKeywordList';

function FeedSources() {
  return (
    <>
      <NewsSourcesList />
      <AddRssForm />
    </>
  );
}

function FeedKeywords() {
  return (
    <>
      {/* <NewsKeywordList />
      <AddKeywordForm /> */}
    </>
  );
}

function NewsFeed() {
  return (
    <>
      <Divider />
      <div style={{ marginBottom: '20px' }}>
        <FeedSources />
      </div>
      <Divider />
      {/* <div>
        <FeedKeywords />
      </div> */}
    </>
  );
}

export default NewsFeed;
