import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
  className?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  checked?: boolean;
}

export function Input(props: InputProps) {
  const { value, onChange, type = 'text', checked } = props;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      checked={checked}
      className={styles['search-bar__input']}
    />
  );
}
