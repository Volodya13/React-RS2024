import { Component, ReactNode } from "react";
import './Input.css'

export class Input extends Component {
  render(): ReactNode {
    return <>
      <input
        type="text"
        className="search-bar__input"/>
    </>
  }
}
