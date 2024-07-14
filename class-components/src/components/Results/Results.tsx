import { Episode } from '../../services/DataFetch';
import './Results.css';

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
      <div key={episode.uid} className="results__item" onClick={() => onEpisodeClick(episode.uid)}>
        <h3 className="results__item-title">{episode.title}</h3>
        <div className="results__item-info">
          <div className="season">
            <b>Season:</b> {episode.seasonNumber},
          </div>
          <div className="episode">
            <b>Episode:</b> {episode.episodeNumber},
          </div>
          <div className="series">
            <b>Series:</b> {episode.seriesTitle}
          </div>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
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
    <div className="results">
      {renderEpisodes()}
      {renderPagination()}
    </div>
  );
}
