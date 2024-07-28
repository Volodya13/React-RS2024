import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const { onClick, children, className, disabled } = props;

  return (
    <button type="button" onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}
