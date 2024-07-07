import { Component, ReactNode } from 'react';
import './Results.css';
import { Episode } from '../../services/DataFetch';

interface ResultsProps {
  episodes: Episode[];
  pageNumber: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export class Results extends Component<ResultsProps> {
  renderEpisodes = (): ReactNode => {
    const { episodes } = this.props;

    return episodes.map((episode, index) => (
      <div key={index} className="results__item">
        <h3 className="results__item-title">{episode.title}</h3>
        <span className="results__item-info">
          Season: {episode.seasonNumber}, Episode: {episode.episodeNumber}, Series: {episode.seriesTitle}
        </span>
      </div>
    ));
  }

  renderPagination = (): ReactNode => {
    const { pageNumber, totalPages, onPageChange } = this.props;

    return (
      <div className="pagination">
        <button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>
          Previous
        </button>
        <span>{pageNumber} / {totalPages}</span>
        <button disabled={pageNumber === totalPages} onClick={() => onPageChange(pageNumber + 1)}>
          Next
        </button>
      </div>
    );
  }

  render(): ReactNode {
    return (
      <div className="results">
        {this.renderEpisodes()}
        {this.renderPagination()}
      </div>
    );
  }
}
