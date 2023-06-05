import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { INewsState } from 'renderer/store/newsSlice';
import ReactDOM from 'react-dom';
import NewsItem from '../NewsItem/NewsItem';

const NewsList = React.forwardRef((props, ref: any) => {
  const news = useSelector((state: { news: INewsState }) => state.news.news);
  const node = document.querySelector('#news-list-portal');
  if (!node) return null;

  return ReactDOM.createPortal(
    <>
      {!news.length && <h2>News list empty</h2>}
      <div className="portrait_A4_page" ref={ref} id="news-list">
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
      </div>
    </>,
    node
  );
});

export default NewsList;
