import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

type InputProps = {
  label?: string;
  required?: boolean;
  error?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

function Input({ className, error, ...props }: InputProps) {
  return (
    <div className={styles['wrapper']}>
      <input
        className={cn(styles['input'], className, {
          [styles['error']]: !!error,
        })}
        {...props}
      />
      {error && (
        <div className={styles['error-message']} role="alert">
          {error.join('\n')}
        </div>
      )}
    </div>
  );
}

export default Input;
