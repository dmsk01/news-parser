import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { appState } from 'renderer/store/newsSlice';
import { IRss } from 'renderer/pages/Search';
import NewsItem from '../NewsItem/NewsItem';

function NewsList() {
  const news: any = useSelector((state: any) => state.news.news);

  if (news.length) {
    return news.map((src: any) => {
      return src.items.map((item: any) => {
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
      });
    });
  }

  // return (
  //     {info.map(src:any=>
  //      { console.log(src)}

  //       // <ul className="news-list">
  //       //   {src.map((newsItem) => {
  //       //     const id = uuidv4();
  //       //     return (
  //       //       <NewsItem
  //       //         key={id}
  //       //         id={id}
  //       //         title={newsItem.title}
  //       //         body={newsItem.body}
  //       //         date={newsItem.date}
  //       //         source={newsSource}
  //       //       />
  //       //     );
  //       //   })}
  //       // </ul>

  //     )}
  // );
}

export default NewsList;
