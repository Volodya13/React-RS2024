import { ChangeEvent } from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input(props: InputProps) {
  const { value, onChange } = props;

  return <input type="text" value={value} onChange={onChange} className="search-bar__input" />;
}
