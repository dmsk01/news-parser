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

  const feeds = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds
  );
  const currentFeed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );

  const handleSubmit = (feed: string) => {
    dispatch(addFeed({ feed }));
    dispatch(setCurrentFeed({ currentFeed: feed }));
  };

  const handleChange = (value: string) => {
    dispatch(setCurrentFeed({ currentFeed: value }));
  };
  return (
    <>
      <Form>
        <Form.Item label="Feeds">
          <Select onChange={(value) => handleChange(value)} value={currentFeed}>
            {feeds &&
              Object.keys(feeds).map((feed) => (
                <Select.Option key={feed} value={feed}>
                  {capitalizeFirstLetter(feed)}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
      <AddForm name="feed" label="Add new feed" onSubmit={handleSubmit} />
      {feeds && <NewsFeed feeds={feeds} />}
    </>
  );
}

export default NewsFeeds;
