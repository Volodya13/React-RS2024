import { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetEpisodeByIdQuery } from '../../services/episodesApi';
import styles from './Detail.module.css';
import { Button } from '../../utils/ui/Button/Button.tsx';

const Detail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetEpisodeByIdQuery(id || '');

  const handleClose = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Error: {error.toString()}</div>;
  }

  if (!data) {
    return <div className={styles['no-data']}>No data found</div>;
  }
  console.log('data', data);
  return (
    <div className={styles['detail']}>
      <Button onClick={handleClose} className={styles['close-button']}>
        Close
      </Button>
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>{data.usAirDate}</p>
          <p>{data.uid}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
