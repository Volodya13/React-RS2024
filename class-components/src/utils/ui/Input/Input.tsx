import { ChangeEvent } from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/*export class Input extends Component<InputProps> {
  render(): ReactNode {
    const { value, onChange } = this.props;

    return <input type="text" value={value} onChange={onChange} className="search-bar__input" />;
  }
}*/

export function Input(props: InputProps) {
  const { value, onChange } = props;

  return <input type="text" value={value} onChange={onChange} className="search-bar__input" />;
}
