import styles from './Form.module.css';
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      profilePicture: fileRef.current?.files,
      termsAndConditions: termsRef.current?.checked,
    };

    console.log(formData);
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
