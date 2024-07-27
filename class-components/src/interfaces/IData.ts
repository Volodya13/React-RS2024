import { IEpisode } from './IEpisode.ts';

interface IPage {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
}

export interface IData {
  page: IPage;
  sort: { clauses: [] };
  episodes: IEpisode[];
}
