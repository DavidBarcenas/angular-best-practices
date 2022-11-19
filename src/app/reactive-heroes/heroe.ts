export interface HeroResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: HeroData;
}

export interface HeroData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Hero[];
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: HeroSubItems;
  series: HeroSubItems;
  stories: HeroSubItems;
  events: HeroSubItems;
  urls: URL[];
}

export interface HeroSubItems {
  available: number;
  collectionURI: string;
  items: HeroSubItem[];
  returned: number;
}

export interface HeroSubItem {
  resourceURI: string;
  name: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface URL {
  type: URLType;
  url: string;
}

export enum URLType {
  Comiclink = 'comiclink',
  Detail = 'detail',
  Wiki = 'wiki',
}
