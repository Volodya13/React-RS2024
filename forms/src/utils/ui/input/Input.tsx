import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';

type InputProps = {
  label?: string;
  required?: boolean;
  error?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => (
  <div className={styles['wrapper']}>
    <input
      ref={ref}
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
));

export default Input;
