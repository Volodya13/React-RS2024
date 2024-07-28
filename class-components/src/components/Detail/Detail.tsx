import { FC } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGetEpisodeByIdQuery } from '../../services/episodesApi';
import styles from './Detail.module.css';
import { Button } from '../../utils/ui/Button/Button.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';

const Detail: FC = () => {
  const { theme } = useTheme();

  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetEpisodeByIdQuery(id || '');

  const handleClose = () => {
    const page = searchParams.get('page') || '0';
    navigate(`/?page=${page}`);
  };

  if (isLoading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  if (error) {
    return <div className={styles['error']}>Error: {error.toString()}</div>;
  }

  if (!data || !data.episode) {
    return <div className={styles['no-data']}>No data found</div>;
  }

  const episode = data.episode;

  return (
    <div className={styles[theme.concat('detail')]} id={styles['detail']}>
      <Button onClick={handleClose} className={styles['close-button']}>
        X
      </Button>
      <div className={styles['detail-info']}>
        <h3 className={styles['detail-title']}>
          Details about episode: <span>{episode.title}</span>
        </h3>
        <p>
          Season: <span>{episode.season?.title}</span>
        </p>
        <p>
          Series: <span>{episode.series?.title}</span>
        </p>
        <p>
          Date: <span>{episode.usAirDate}</span>
        </p>
        <h3>Directors:</h3>
        <ul className={styles['detail-inf0-list']}>
          {episode.directors &&
            episode.directors.map((director: { uid: string; name: string }) => (
              <li key={director.uid}>{director.name}</li>
            ))}
        </ul>
        <h3>Writers:</h3>
        <ul className={styles['detail-inf0-list']}>
          {episode.writers &&
            episode.writers.map((writer: { uid: string; name: string }) => (
              <li key={writer.uid}>{writer.name}</li>
            ))}
        </ul>
        <h3>Characters:</h3>
        <ul className={styles['detail-inf0-list']}>
          {episode.characters &&
            episode.characters.map((character: { uid: string; name: string }) => (
              <li key={character.uid}>{character.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Detail;
