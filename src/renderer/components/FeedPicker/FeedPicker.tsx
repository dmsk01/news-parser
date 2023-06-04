import React, { useState } from 'react';
import { Form, Radio, Typography } from 'antd';
import './feedPicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingsState, setCurrentFeed } from 'renderer/store/settingsSlice';
import { capitalizeFirstLetter } from 'renderer/utils';

function FeedPicker() {
  const dispatch = useDispatch();

  const feedsObj = useSelector(
    (state: { settings: ISettingsState }) => state.settings.feeds
  );
  const feeds = Object.keys(feedsObj);
  const [selected, setSelected] = useState(Object.keys(feeds)[0]);
  const handleChange = (event: any) => {
    dispatch(setCurrentFeed({ currentFeed: event.target.value }));
    setSelected(event.target);
  };
  return (
    <>
      <Typography.Title
        style={{ color: '#fefefe', padding: '0 20px', marginTop: '30px' }}
        level={4}
      >
        Feeds
      </Typography.Title>
      <Form
        style={{ background: '#fefefe', padding: '20px 0', color: 'white' }}
      >
        <Form.Item name="radio-group" style={{ margin: 0 }}>
          <Radio.Group
            value={selected}
            onChange={(value) => handleChange(value)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0 25px',
            }}
          >
            {feeds.length &&
              feeds.map((feed) => (
                <Radio key={feed} value={feed} className="radio-item">
                  {capitalizeFirstLetter(feed)}
                </Radio>
              ))}
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
}

export default FeedPicker;
