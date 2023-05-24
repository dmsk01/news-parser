import React from 'react';
import { INewsItem } from 'renderer/types/news';

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
          <time dateTime={isoDate}>{isoDate}</time>
          <p>{details}</p>
        </div>
        <input id={id} type="checkbox" className="news-item__title" />
      </label>
      <div className="news-item__body">{body}</div>
    </li>
  );
}

export default NewsItem;
