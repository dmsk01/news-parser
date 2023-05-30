import React, { useState } from 'react';
import { Divider, Checkbox, Typography, Row } from 'antd';
import { INewsItem } from 'renderer/types/news';

const formatIsoDate = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const date = dateObj.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = dateObj.toLocaleTimeString('ru-RU', {
    timeStyle: 'short',
  });
  return `${date} ${time}`;
};

function NewsItem({
  title,
  body,
  sourceName,
  isoDate,
  id,
  details,
}: INewsItem) {
  const [checked, setChecked] = useState(false);
  const { Title, Text } = Typography;
  return (
    <li className="news-item">
      <label htmlFor={id}>
        <Row align="top" wrap={false}>
          <Checkbox
            id={id}
            className="news-item-checkbox"
            type="checkbox"
            style={{ marginTop: '5px', marginRight: '10px' }}
          />
          <Title level={4} style={{ marginBottom: '0px' }}>
            {title}
          </Title>
        </Row>
        <Row align="bottom" justify="start">
          <Title
            level={5}
            className="news-item__source"
            style={{ marginRight: '16px' }}
          >
            {sourceName}
          </Title>
          <Title level={5}>{formatIsoDate(isoDate)}</Title>
        </Row>
        <Text>{details}</Text>
      </label>
      <div className="news-item__body">{body}</div>
      <Divider plain />
    </li>
  );
}

export default NewsItem;
