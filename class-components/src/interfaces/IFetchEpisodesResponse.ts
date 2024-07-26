import { IEpisode } from './IEpisode.ts';

export interface IPage {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface IFetchEpisodesResponse {
  page: IPage;
  episodes: IEpisode[];
}
