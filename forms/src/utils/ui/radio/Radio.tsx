import { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Radio.module.css';

type RadioProps = { label: string | ReactNode } & InputHTMLAttributes<HTMLInputElement>;

function Radio({ label, ...props }: RadioProps) {
  return (
    <label className={styles.wrapper} role="caption">
      <input className={styles.radio} type="radio" {...props} />
      {label}
    </label>
  );
}

export default Radio;
