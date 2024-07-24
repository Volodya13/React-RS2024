import { Episode } from '../../services/DataFetch';
import styles from './Results.module.css';

interface ResultsProps {
  episodes: Episode[];
  pageNumber: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onEpisodeClick: (id: string) => void;
}

export function Results({
  episodes,
  pageNumber,
  totalPages,
  onPageChange,
  onEpisodeClick,
}: ResultsProps) {
  const renderEpisodes = () => {
    return episodes.map((episode) => (
      <div
        key={episode.uid}
        className={styles['results__item']}
        onClick={() => onEpisodeClick(episode.uid)}
      >
        <h3 className={styles['results__item-title']}>{episode.title}</h3>
      </div>
    ));
  };

  const renderPagination = () => {
    return (
      <div className={styles['pagination']}>
        <button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>
          Previous
        </button>
        <span>
          {pageNumber} / {totalPages}
        </span>
        <button disabled={pageNumber === totalPages} onClick={() => onPageChange(pageNumber + 1)}>
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles['results']}>
      {renderEpisodes()}
      {renderPagination()}
    </div>
  );
}
