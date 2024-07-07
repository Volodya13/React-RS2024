import { Component, ReactNode } from 'react';
import './Results.css';
import { Episode } from '../../services/DataFetch';

interface ResultsProps {
  episodes: Episode[];
}

export class Results extends Component<ResultsProps> {
  renderEpisodes = (): ReactNode => {
    const { episodes } = this.props;

    return episodes.map((episode, index) => (
      <div key={index} className="results__item">
        <h4 className="results__item-title">{episode.title}</h4>
        <span className="results__item-season">Season: {episode.seasonNumber}</span>
      </div>
    ));
  };

  render(): ReactNode {
    return <div className="results">{this.renderEpisodes()}</div>;
  }
}
