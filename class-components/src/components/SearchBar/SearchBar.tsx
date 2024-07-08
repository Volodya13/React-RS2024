import { ChangeEvent, Component, ReactNode } from 'react';
import './SearchBar.css';
import { Input } from '../../utils/ui/Input/Input';
import { Button } from '../../utils/ui/Button/Button';

interface SearchBarProps {
  searchItem: string;
  error: Error | null;
  setError: (error: Error | null) => void;
  onSearch: (searchItem: string, pageNumber: number) => void;
  onSearchChange: (searchItem: string) => void;
}

interface SearchBarState {
  searchItem: string;
  warning: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchItem: this.props.searchItem,
    warning: '',
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchItem = event.target.value;
    this.setState({ searchItem, warning: '' });
    this.props.onSearchChange(searchItem);
  };

  handleSearch = () => {
    const trimmedSearchItem = this.state.searchItem.trim();
    if (trimmedSearchItem === '') {
      this.setState({ warning: 'Please enter a search term.' });
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedSearchItem)) {
      this.setState({ warning: 'Please use only Latin letters.' });
    } else {
      this.props.onSearch(trimmedSearchItem, 1);
    }
  };

  render(): ReactNode {
    const { error } = this.props;
    const { searchItem, warning } = this.state;

    return (
      <div className="search-bar__container">
        <h1>Space - final frontier!</h1>
        <Input value={searchItem} onChange={this.handleChange} />
        <Button className="search-bar__search-button" onClick={this.handleSearch}>
          Search
        </Button>
        {warning && <div className="warning">{warning}</div>}
        {error && <div className="error">Error: {error.message}</div>}
      </div>
    );
  }
}
