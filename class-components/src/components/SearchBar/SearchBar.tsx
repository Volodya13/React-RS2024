import { ChangeEvent, Component, ReactNode } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string, pageNumber: number) => void;
}

export class SearchBar extends Component<SearchBarProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;
    this.props.onSearch(searchItem, 1); // always reset to the first page on a new search
  };

  handleSearch = () => {
    this.props.onSearch(this.props.searchItem, 1); // always reset to the first page on a new search
  };

  render(): ReactNode {
    const { searchItem, error } = this.props;

    return (
      <div className="search-bar__container">
        <h1>Space - final frontier!</h1>
        <Input value={searchItem} onChange={this.handleChange} />
        <Button className='search-bar__search-button' onClick={this.handleSearch}>Search</Button>
        {error && <div>Error: {error.message}</div>}
      </div>
    );
  }
}
