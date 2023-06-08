import React from 'react';
import { Form, Radio, RadioChangeEvent, Typography } from 'antd';
import './feedPicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingsState, setCurrentFeed } from 'renderer/store/settingsSlice';
import { capitalizeFirstLetter } from 'renderer/utils';

function FeedPicker() {
  const dispatch = useDispatch();

  const currentFeed = useSelector(
    (state: { settings: ISettingsState }) => state.settings.currentFeed
  );
  const feeds = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds
  );

  const handleChange = (e: RadioChangeEvent) => {
    dispatch(setCurrentFeed({ currentFeed: e.target.value }));
  };
  return (
    <>
      <Typography.Title
        style={{ color: '#fefefe', padding: '0 20px', marginTop: '30px' }}
        level={4}
        className="feed-title"
      >
        Feeds
      </Typography.Title>
      <Form
        style={{ background: '#fefefe', padding: '20px 0', color: 'white' }}
      >
        <Form.Item
          style={{
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 25px',
          }}
        >
          {feeds &&
            Object.keys(feeds).map((feed) => (
              <Radio
                onChange={handleChange}
                key={feed}
                value={feed}
                className="radio-item"
                checked={feed === currentFeed}
                style={{ display: 'flex' }}
              >
                {capitalizeFirstLetter(feed)}
              </Radio>
            ))}
        </Form.Item>
      </Form>
    </>
  );
}

export default FeedPicker;
