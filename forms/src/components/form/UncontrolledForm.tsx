import styles from './Form.module.css';
import React, { useRef } from 'react';
import {useDispatch} from "react-redux";
import {handleImageUpload} from "../../utils/fileUtils.ts";
import {FormsData} from "../../interfaces/interfaces.tsx";
import {saveUncontrolledFormData} from "../../store/reducers/formSlice.tsx";
import {useNavigate} from "react-router-dom";

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    const data: FormsData = {
      name: formData.get('name') as string,
      age: Number(formData.get('age')),
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      gender: formData.get('gender') as string,
      profilePicture: formData.get('profilePicture') as unknown as FileList,
      termsAndConditions: formData.get('termsAndConditions') === 'on',
    };

    // Проверка наличия загруженного файла
    if (data.profilePicture && data.profilePicture.length > 0) {
      const imageFile = data.profilePicture[0];
      if (imageFile) {
        const base64String = await handleImageUpload(imageFile);
        data.profilePicture = base64String as unknown as FileList;
      }
    }

    dispatch(saveUncontrolledFormData(data));

    navigate('/');
  };

  return (
    <form className={styles.Form} onSubmit={onSubmit}>
      <div className={styles.formField}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameRef} />
      </div>
      <div className={styles.formField}>
        <label htmlFor="age">Age</label>
        <input id="age" type="number" ref={ageRef} />
      </div>
      <div className={styles.formField}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" ref={emailRef} />
      </div>
      <div className={styles.formField}>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <div className={styles.formField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
      </div>
      <div className={styles.formField}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className={styles.formField}>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input id="profilePicture" type="file" ref={fileRef} />
      </div>
      <div className={styles.formField}>
        <label>
          <input type="checkbox" ref={termsRef} />I accept the Terms and Conditions
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
