import styles from './Pagination.module.css';
import { Button } from '../../utils/ui/Button/Button.tsx';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '0', 10);

  const handleClickNext = () => {
    const nextPage = currentPage + 1;
    setSearchParams({ page: nextPage.toString() });
  };

  const handleClickPrevious = () => {
    const prevPage = currentPage - 1;
    setSearchParams({ page: prevPage.toString() });
  };

  return (
    <div className={styles['pagination']}>
      <Button
        onClick={handleClickPrevious}
        className={styles['pagination-button']}
        disabled={currentPage <= 0}
      >
        ◀️
      </Button>
      <span className={styles['pagination-info']}>Page {currentPage}</span>
      <Button onClick={handleClickNext} className={styles['pagination-button']}>
        ▶️
      </Button>
    </div>
  );
};

export default Pagination;
