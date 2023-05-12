export interface INewsItem {
  title: string;
  body: string;
  source: string;
  date: string;
  id: string;
}

export interface INews {
  items: INewsItem[];
  title: string;
}
