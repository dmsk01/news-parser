import React from 'react';
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
  const { Title, Text } = Typography;
  return (
    <div className="list-item">
      <label htmlFor={id}>
        <Row align="top" wrap={false}>
          <Checkbox
            id={id}
            className="news-item-checkbox"
            type="checkbox"
            style={{
              marginTop: '5px',
              marginRight: '10px',
              marginBottom: '16px',
            }}
          />
          <Title level={4}>{title}</Title>
        </Row>
        <Row align="bottom" justify="start" style={{ marginBottom: '16px' }}>
          <span className="news-item__source" style={{ marginRight: '16px' }}>
            <strong>{sourceName}</strong>
          </span>
          &nbsp;
          <span>
            <strong>{formatIsoDate(isoDate)}</strong>
          </span>
        </Row>
        <Text>{details}</Text>
      </label>
      <div className="news-item__body">{body}</div>
      <Divider plain />
    </div>
  );
}

export default NewsItem;
