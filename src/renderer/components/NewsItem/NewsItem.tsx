import React from 'react';
import { INewsItem } from 'renderer/types/news';

const convertFromIsoDate = (isoDate: string) => {
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
  return (
    <li className="news-item">
      <label htmlFor={id} className="news-item__heading">
        <div className="news-item__info">
          <h2 className="news-item__title">{title}</h2>
          <p className="news-item__source">{sourceName}</p>
          <time dateTime={isoDate}>{convertFromIsoDate(isoDate)}</time>
          <p>{details}</p>
        </div>
        <input id={id} type="checkbox" className="news-item__title" />
      </label>
      <div className="news-item__body">{body}</div>
    </li>
  );
}

export default NewsItem;
