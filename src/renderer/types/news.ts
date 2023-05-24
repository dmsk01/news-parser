export interface INewsItem {
  title: string;
  body: string;
  sourceName: string;
  isoDate: string;
  id: string;
  link?: string;
  details?: string;
}

export interface INews {
  items: INewsItem[];
  title: string;
}
