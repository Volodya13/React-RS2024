import { useForm } from 'react-hook-form';
import { IFormsData } from '../../interfaces/IFormsData';
import styles from './Form.module.css';
import FormField from '../../utils/ui/form-field/FormField.tsx';
import Label from '../../utils/ui/label/Label.tsx';
import Radio from '../../utils/ui/radio/Radio.tsx';

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormsData>();

  const onSubmit = (data: IFormsData) => {
    console.log(data);
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label={'Name'}
        id={'name'}
        type={'text'}
        placeholder={'Enter your name'}
        register={register}
        error={errors.name?.message}
        required
      />
      <FormField
        label={'Age'}
        id={'age'}
        type={'number'}
        placeholder={'Age'}
        register={register}
        error={errors.age?.message}
        required
      />
      <FormField
        label={'Email'}
        id={'email'}
        type={'email'}
        placeholder={'Email'}
        register={register}
        error={errors.email?.message}
        required
      />
      <FormField
        label={'Password'}
        id={'password'}
        type={'password'}
        placeholder={'Password'}
        register={register}
        error={errors.password?.message}
        required
      />
      <FormField
        label={'Confirm Password'}
        id={'confirmPassword'}
        type={'password'}
        placeholder={'Confirm Password'}
        register={register}
        error={errors.confirmPassword?.message}
        required
      />
      <div className={styles.gender}>
        <label>Gender</label>
        <div>
          <Label>
            <Radio
              label={undefined}
              type="radio"
              value="male"
              {...register('gender', { required: 'Please select your gender' })}
            />
            Male
          </Label>
          <Label>
            <Radio
              label={undefined}
              type="radio"
              value="female"
              {...register('gender', { required: 'Please select your gender' })}
            />
            Female
          </Label>
          <Label>
            <Radio
              label={undefined}
              type="radio"
              value="other"
              {...register('gender', { required: 'Please select your gender' })}
            />
            Other
          </Label>
        </div>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <FormField
        label={'I accept the Terms and Conditions'}
        id={'termsAndConditions'}
        type={'checkbox'}
        register={register}
        error={errors.termsAndConditions?.message}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
