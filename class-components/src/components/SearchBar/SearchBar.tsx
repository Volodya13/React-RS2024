import { ChangeEvent, Component, ReactNode } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string) => void;
}

export class SearchBar extends Component<SearchBarProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.props.onSearch(event.target.value);
  };

  handleSearch = () => {
    this.props.onSearch(this.props.searchItem);
  };

  render(): ReactNode {
    const { searchItem, error } = this.props;

    return (
      <div className="search-bar__container">
        <Input value={searchItem} onChange={this.handleChange} />
        <Button className='search-bar__search-button' onClick={this.handleSearch}>Search</Button>
        {error && <div>Error: {error.message}</div>}
      </div>
    );
  }
}
