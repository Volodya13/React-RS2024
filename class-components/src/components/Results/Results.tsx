import styles from './Results.module.css';
import { Spinner } from '../Spinner/Spinner';
import { useGetAllEpisodesQuery } from '../../services/episodesApi';
import { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.tsx';

const Results: FC = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '0', 10);
  const { data, isError, isLoading } = useGetAllEpisodesQuery(page);
  const navigate = useNavigate();
  const handleEpisodeClick = (episodeId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    navigate(`/details/${episodeId}?${params.toString()}`);
  };

  return (
    <div className={styles['results']}>
      {isLoading && <Spinner />}
      {isError && <div>Something went wrong...</div>}
      {data && data.episodes.length === 0 && <div>No episodes available.</div>}
      {data && data.episodes.length > 0 && (
        <ul>
          {data.episodes.map((episode) => (
            <li
              className={styles['results__item']}
              key={episode.uid}
              onClick={() => handleEpisodeClick(episode.uid)}
            >
              <span className={styles['results__item-title']}>{episode.title}</span>
              <span className={styles['results__item-date']}>{episode.usAirDate}</span>
            </li>
          ))}
        </ul>
      )}
      <Pagination />
    </div>
  );
};

export default Results;
