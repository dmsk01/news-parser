import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { INewsItem, INews } from 'renderer/types/news';
import NewsItem from '../NewsItem/NewsItem';

function NewsList() {
  const news = useSelector((state: { news: INews }) => state.news.news);
  return news.length ? (
    news.map((src: INews) =>
      src.items.map((item: INewsItem) => {
        const id = uuidv4();
        return (
          <NewsItem
            key={id}
            id={id}
            title={item.title}
            body={item.body}
            date={item.date}
            source={src.title}
          />
        );
      })
    )
  ) : (
    <h2>News list empty</h2>
  );
}

export default NewsList;
