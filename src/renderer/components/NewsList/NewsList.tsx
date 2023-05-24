import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { INewsState } from 'renderer/store/newsSlice';
import NewsItem from '../NewsItem/NewsItem';

function NewsList() {
  const news = useSelector((state: { news: INewsState }) => state.news.news);

  if (!news.length) return <h2>News list empty</h2>;

  return (
    <ul>
      {news.map((item) => {
        const id = uuidv4();
        return (
          <NewsItem
            key={id}
            id={id}
            title={item.title}
            body={item.body}
            isoDate={item.isoDate}
            sourceName={item.sourceName}
            details={item.details}
          />
        );
      })}
    </ul>
  );
}

export default NewsList;
