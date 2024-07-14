import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

/*export class Button extends Component<ButtonProps> {
  render(): ReactNode {
    const { onClick, children } = this.props;
    return (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    );
  }
}*/

export function Button(props: ButtonProps) {
  const { onClick, children, className } = props;

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}
