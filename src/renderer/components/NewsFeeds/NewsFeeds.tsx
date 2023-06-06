import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import {
  ISettingsState,
  addFeed,
  setCurrentFeed,
} from 'renderer/store/settingsSlice';
import { capitalizeFirstLetter } from 'renderer/utils';
import AddForm from '../AddForm/AddForm';
import NewsFeed from './NewsFeed';

function NewsFeeds() {
  const dispatch = useDispatch();

  const feedsObj = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds
  );
  const currentFeed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  const feeds = Object.keys(feedsObj);
  if (!feeds) return null;

  const handleSubmit = (feed: string) => {
    dispatch(addFeed({ feed }));
  };

  const handleChange = (value: string) => {
    dispatch(setCurrentFeed({ currentFeed: value }));
  };
  return (
    <>
      <AddForm name="feed" label="Add feed" onSubmit={handleSubmit} />
      <Form>
        <Form.Item label="Feeds">
          <Select onChange={(value) => handleChange(value)} value={currentFeed}>
            {feeds &&
              feeds.map((feed) => (
                <Select.Option key={feed} value={feed}>
                  {capitalizeFirstLetter(feed)}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
      <NewsFeed feeds={feedsObj} />
    </>
  );
}

export default NewsFeeds;
