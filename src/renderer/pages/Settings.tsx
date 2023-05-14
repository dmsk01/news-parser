import React from 'react';
import { Link } from 'react-router-dom';
import AddForm from 'renderer/components/AddForm/AddForm';
import NewsSources from 'renderer/components/NewsSources/NewsSources';

const rssSources = [
  'https://tass.ru/rss/v2.xml',
  'https://ria.ru/export/rss2/archive/index.xml',
  'http://static.feed.rbc.ru/rbc/logical/footer/news.rss',
];

function Settings() {
  return (
    <div>
      Settings page
      <NewsSources />
      <AddForm />
      <Link to="/" className="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          width="30"
          height="30"
          viewBox="0 0 120 120"
          fill="#fff"
        >
          <path d="M48.319 0C61.662 0 73.74 5.408 82.484 14.152s14.152 20.823 14.152 34.166c0 12.809-4.984 24.451-13.117 33.098.148.109.291.23.426.364l34.785 34.737a3.723 3.723 0 0 1-5.25 5.28L78.695 87.06a3.769 3.769 0 0 1-.563-.715 48.116 48.116 0 0 1-29.814 10.292c-13.343 0-25.423-5.408-34.167-14.152C5.408 73.741 0 61.661 0 48.318s5.408-25.422 14.152-34.166C22.896 5.409 34.976 0 48.319 0zm28.763 19.555c-7.361-7.361-17.53-11.914-28.763-11.914s-21.403 4.553-28.764 11.914c-7.361 7.361-11.914 17.53-11.914 28.763s4.553 21.403 11.914 28.764c7.36 7.361 17.53 11.914 28.764 11.914 11.233 0 21.402-4.553 28.763-11.914 7.361-7.36 11.914-17.53 11.914-28.764 0-11.233-4.553-21.402-11.914-28.763z" />
        </svg>
        <span>Back to search</span>
      </Link>
    </div>
  );
}

export default Settings;
