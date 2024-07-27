import { IEpisode } from './IEpisode.ts';

export interface ISearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (episodes: IEpisode[]) => void;
}
