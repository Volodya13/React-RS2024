import { IEpisode } from './IEpisode';

export interface IResultsProps {
  results: IEpisode[];
  loading: boolean;
  error?: Error | null;
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onEpisodeClick: (id: string) => void;
}
