import { Component, ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { onClick, children } = this.props;
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}
