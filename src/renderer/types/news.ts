export interface INewsItem {
  title: string;
  body: string;
  sourceName: string;
  isoDate: string;
  id: string;
}

export interface INews {
  items: INewsItem[];
  title: string;
  link?: string;
}
