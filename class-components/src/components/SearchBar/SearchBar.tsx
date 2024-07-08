import { ChangeEvent, Component, ReactNode } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';
import { Spinner } from '../Spinner/Spinner';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string, pageNumber: number) => void;
  loading?: boolean
}

export class SearchBar extends Component<SearchBarProps> {
  state = {
    searchItem: '',
    error: null,
    loading: true,
  }
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;
    this.props.onSearch(searchItem, 1);
  };

  handleSearch = () => {
    this.props.onSearch(this.props.searchItem, 1);
  };

  render(): ReactNode {
    const { searchItem, error, loading } = this.props;

    if (loading) {
      return <Spinner />
    }

    return (
      <div className="search-bar__container">
        <h1>Space - final frontier!</h1>
        <Input value={searchItem} onChange={this.handleChange} />
        <Button className="search-bar__search-button" onClick={this.handleSearch}>
          Search
        </Button>
        {error && <div>Error: {error.message}</div>}
      </div>
    );
  }
}
