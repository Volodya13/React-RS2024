import React, { ReactNode } from 'react';
import styles from './Label.module.css';

type LabelProps = {
  label?: string;
  children: ReactNode;
  required?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

function Label({ label, children, required }: LabelProps) {
  if (!label) {
    return <>{children}</>;
  }

  return (
    <>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      {children}
    </>
  );
}

export default Label;
