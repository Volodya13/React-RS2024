import { useForm } from 'react-hook-form';
import { FieldTypes, FormsData } from '../../interfaces/interfaces';
import styles from './Form.module.css';
import FormField from '../../utils/ui/form-field/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema.ts';
import { useDispatch } from 'react-redux';
import { handleImageUpload } from '../../utils/fileUtils.ts';
import { saveControlledFormData } from '../../store/reducers/formSlice.tsx';
import {useNavigate} from "react-router-dom";

function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormsData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormsData) => {
    const imgFile = data.profilePicture[0];

    if (imgFile) {
      const base64String = await handleImageUpload(imgFile);
      data.profilePicture = base64String as unknown as FileList;
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
      <FormField
        label={'Password'}
        id={'password'}
        type={FieldTypes.password}
        placeholder={'Enter password'}
        register={register}
        error={errors.password?.message}
        required
      />
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
