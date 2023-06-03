import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Select } from 'antd';
import { ISettingsState, addFeed } from 'renderer/store/settingsSlice';
import { capitalizeFirstLetter } from 'renderer/utils';
import AddForm from '../AddForm/AddForm';

function NewsFeed() {
  const dispatch = useDispatch();
  const feeds = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds
  );
  const [selected, setSelected] = useState(feeds[0]);

  const handleSubmit = (feed: string) => {
    dispatch(addFeed({ feed }));
  };
  return (
    <>
      <AddForm name="feed" label="Feed" onSubmit={handleSubmit} />
      <Form>
        <Form.Item label="Select">
          <Select onChange={(value) => setSelected(value)} value={selected}>
            {feeds.map((feed) => (
              <Select.Option value={feed}>
                {capitalizeFirstLetter(feed)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewsFeed;
