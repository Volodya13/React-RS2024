import { FormsDataField } from '../../../interfaces/interfaces.tsx';
import { FC } from 'react';
import styles from './FormField.module.css';
import Label from '../label/Label.tsx';
import Radio from '../radio/Radio.tsx';
import Checkbox from '../checkbox/Checkbox.tsx';
import Input from '../input/Input.tsx';

const FormField: FC<FormsDataField> = ({
  label,
  id,
  type,
  placeholder,
  register,
  error,
  required,
}) => {
  return (
    <div className={styles.formField}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {type === 'radio' && <Radio label={undefined} id={id} {...register(id, { required })} />}
      {type === 'checkbox' && (
        <Checkbox label={undefined} id={id} {...register(id, { required })} />
      )}
      {type !== 'radio' && type !== 'checkbox' && (
        <Input id={id} type={type} placeholder={placeholder} {...register(id, { required })} />
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default FormField;
