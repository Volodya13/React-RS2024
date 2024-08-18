import { calculatePasswordStrength } from '../../fileUtils.ts';
import styles from './PasswordStrength.module.css';
import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = calculatePasswordStrength(password);

  const getStrengthGrade = (strength: number) => {
    switch (strength) {
      case 1:
      case 2:
        return 'Very Weak';
      case 3:
        return 'Weak';
      case 4:
      case 5:
        return 'Medium';
      case 6:
        return 'Strong';
      case 7:
        return 'Very Strong';
      default:
        return 'Very Weak';
    }
  };

  return (
    <div className={styles.passwordStrengthMeter}>
      <div className={styles.strengthLabel}>Strength: {getStrengthGrade(strength)}</div>
      <div className={styles.strengthBar}>
        <div
          className={styles.strengthIndicator}
          style={{ width: `${(strength / 7) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PasswordStrength;
