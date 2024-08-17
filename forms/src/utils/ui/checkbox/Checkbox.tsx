import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Checkbox.module.css';

type CheckboxProps = {
  label: string | ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...props }, ref) => (
  <label className={styles.wrapper}>
    <input ref={ref} className={styles.checkbox} type="checkbox" {...props} />
    {label}
  </label>
));

export default Checkbox;
