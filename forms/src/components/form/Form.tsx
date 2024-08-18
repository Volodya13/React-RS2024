import { useForm } from 'react-hook-form';
import { FieldTypes, FormsData } from '../../interfaces/interfaces';
import styles from './Form.module.css';
import FormField from '../../utils/ui/form-field/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema.ts';
import { useDispatch } from 'react-redux';
import { saveControlledFormData } from '../../store/reducers/formSlice.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordStrength from '../../utils/ui/password-strength/PasswordStrength.tsx';
import Input from '../../utils/ui/input/Input.tsx';
import { handleImageUpload } from '../../utils/fileUtils.ts';

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsData>({
    resolver: yupResolver<FormsData>(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormsData) => {
    if ('string' !== typeof data.profilePicture && data.profilePicture) {
      const imgFile: FormsData = data.profilePicture[0];

      if (imgFile instanceof File) {
        try {
          const base64String = await handleImageUpload(imgFile);
          data.profilePicture = base64String;
        } catch (error) {
          console.error('Error uploading image:', error);
          data.profilePicture = null;
        }
      } else {
        console.error('Profile picture is not a valid File object.');
        data.profilePicture = null;
      }
    }

    dispatch(saveControlledFormData(data));
    navigate('/');
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label={'Name'}
        id={'name'}
        type={FieldTypes.text}
        placeholder={'Enter your name'}
        register={register}
        error={errors.name?.message}
        required
      />
      <FormField
        label={'Age'}
        id={'age'}
        type={FieldTypes.number}
        placeholder={'Select your age'}
        register={register}
        error={errors.age?.message}
        required
      />
      <FormField
        label={'Email'}
        id={'email'}
        type={FieldTypes.email}
        placeholder={'Enter your email'}
        register={register}
        error={errors.email?.message}
        required
      />
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}
      </div>
      <FormField
        label={'Confirm Password'}
        id={'confirmPassword'}
        type={FieldTypes.password}
        placeholder={'Confirm Password'}
        register={register}
        error={errors.confirmPassword?.message}
        required
      />
      <div className={styles.gender}>
        <label htmlFor={'gender'}>Gender</label>
        <select
          id="gender"
          {...register('gender')}
          aria-errormessage={errors.gender?.message}
          required
        >
          <option value="">Select your gender</option>
          <option value={'Male'}>Male</option>
          <option value={'Female'}>Female</option>
          <option value={'Other'}>Other</option>
        </select>

        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <FormField
        label="Profile Picture"
        id={'profilePicture'}
        type={FieldTypes.file}
        register={register}
        error={errors.profilePicture?.message}
      />
      <FormField
        label={'I accept the Terms and Conditions'}
        id={'termsAndConditions'}
        type={FieldTypes.checkbox}
        register={register}
        error={errors.termsAndConditions?.message}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
