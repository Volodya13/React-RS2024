export interface ISearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
}
