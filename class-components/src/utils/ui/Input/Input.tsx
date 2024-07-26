import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export function Input(props: InputProps) {
  const { value, onChange } = props;

  return (
    <input type="text" value={value} onChange={onChange} className={styles['search-bar__input']} />
  );
}
