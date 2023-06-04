import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import {
  IFeeds,
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
  const [selected, setSelected] = useState(Object.keys(feeds)[0]);

  useEffect(() => {
    dispatch(setCurrentFeed({ currentFeed: selected }));
  }, [selected, dispatch]);

  const handleSubmit = (feed: string) => {
    dispatch(addFeed({ feed }));
  };

  const handleChange = (value: string) => {
    dispatch(setCurrentFeed({ currentFeed: value }));
    setSelected(value);
  };
  return (
    <>
      <AddForm name="feed" label="Add feed" onSubmit={handleSubmit} />
      <Form>
        <Form.Item label="Feeds">
          <Select onChange={(value) => handleChange(value)} value={selected}>
            {Object.keys(feeds).map((feed) => (
              <Select.Option key={feed} value={feed}>
                {capitalizeFirstLetter(feed)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <NewsFeed feeds={feeds} />
    </>
  );
}

export default NewsFeeds;
