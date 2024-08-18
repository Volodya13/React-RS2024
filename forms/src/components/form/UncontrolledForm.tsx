import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormsData } from '../../interfaces/interfaces';
import { saveUncontrolledFormData } from '../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';
import Input from '../../utils/ui/input/Input';
import styles from './Form.module.css';
import { validateUncontrolledForm } from '../../utils/fileUtils';
import { handleImageUpload } from '../../utils/fileUtils';
import PasswordStrength from '../../utils/ui/password-strength/PasswordStrength';

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<Record<keyof FormsData, string | undefined>>({
    name: undefined,
    age: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    gender: undefined,
    profilePicture: undefined,
    termsAndConditions: undefined,
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let base64String = null;
    if (fileRef.current?.files?.length) {
      const imageFile = fileRef.current.files[0];
      base64String = await handleImageUpload(imageFile);
    }

    const data: FormsData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      profilePicture: base64String as unknown as FileList,
      termsAndConditions: termsRef.current?.checked || false,
    };

    const validationErrors = await validateUncontrolledForm(data);

    const hasErrors = Object.values(validationErrors).some((error) => error !== undefined);

    if (!hasErrors) {
      dispatch(saveUncontrolledFormData(data));
      navigate('/');
    } else {
      setErrors(validationErrors as Record<keyof FormsData, string | undefined>);
    }
  };

  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      <div className={styles.formField}>
        <label htmlFor="name">Name</label>
        <Input id="name" type="text" ref={nameRef} required placeholder="Enter your name" />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="age">Age</label>
        <Input id="age" type="number" ref={ageRef} required placeholder="Select your age" />
        {errors.age && <p className={styles.error}>{errors.age}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" ref={emailRef} required placeholder="Enter your email" />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          ref={passwordRef}
          required
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <Input
          id="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          required
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </div>
      <div className={styles.formField}>
        <label htmlFor="profilePicture">Profile Picture</label>
        <Input id="profilePicture" type="file" ref={fileRef} />
        {errors.profilePicture && <p className={styles.error}>{errors.profilePicture}</p>}
      </div>
      <div className={styles.formField}>
        <label>
          <Input id="termsAndConditions" name="termsAndConditions" type="checkbox" ref={termsRef} />
          I accept the Terms and Conditions
        </label>
        {errors.termsAndConditions && <p className={styles.error}>{errors.termsAndConditions}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
