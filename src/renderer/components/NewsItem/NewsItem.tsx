import React from 'react';
import { INewsItem } from 'renderer/types/news';



function NewsItem({ title, body, source, date, id }: INewsItem) {
  return (
    <li className="news-item">
      <label htmlFor={id} className="news-item__heading">
        <div className="news-item__info">
          <h2 className="news-item__title">{title}</h2>
          <p className="news-item__source">{source}</p>
          <time dateTime={date}>{date}</time>
        </div>
        <input id={id} type="checkbox" className="news-item__title" />
      </label>
      <div className="news-item__body">{body}</div>
    </li>
  );
}

export default NewsItem;
