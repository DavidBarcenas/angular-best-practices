import { HeroData } from './hero';

export interface ApiParams {
  apikey: string;
  offset: number;
  limit: number;
  nameStartsWith?: string;
}

export interface HeroResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: HeroData;
}
