import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  label: string | ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className={styles.wrapper}>
      <input className={styles.checkbox} type="checkbox" {...props} />
      {label}
    </label>
  );
}

export default Checkbox;
