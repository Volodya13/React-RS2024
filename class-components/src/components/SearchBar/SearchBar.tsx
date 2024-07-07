import { Component, ReactNode } from "react";
import './SearchBar.css';
import { Input } from "../../utils/ui/Input/Input";
import { Button } from "../../utils/ui/Button/Button";

export class SearchBar extends Component {
  render(): ReactNode {
    return <div className="search-bar__container">
      <Input />
      <Button />
    </div>
  }
}
