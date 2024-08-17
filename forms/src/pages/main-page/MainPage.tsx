import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './MainPage.module.css';
import ResultList from "../../components/result-list/ResultList.tsx";

const MainPage = () => {
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);
  const controlledFormData = useSelector((state: RootState) => state.form.controlledFormData);

  const renderResult = (formType: string) => {
    switch (formType) {
      case 'controlled':
        return <ResultList data={controlledFormData} title={'The Results By Controlled Form Data'} />;
      case 'uncontrolled':
        return <ResultList data={uncontrolledFormData} title={'The Results By Uncontrolled Form Data'} />;
      default:
        return null;
    }
  }

  return (
    <section className={styles.mainPage}>
      {renderResult('controlled')}
      {renderResult('uncontrolled')}
    </section>
  );
};

export default MainPage;
