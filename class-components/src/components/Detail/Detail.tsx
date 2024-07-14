import { useEffect, useState } from 'react';
import { Episode, FetchEpisodes } from '../../services/DataFetch';
import './Detail.css';

interface DetailComponentProps {
  id: string;
}

const Detail: React.FC<DetailComponentProps> = ({ id }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchEpisodes = new FetchEpisodes();

  useEffect(() => {
    fetchEpisodes
      .getEpisodeById(id)
      .then((response) => {
        setEpisode(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <div className="detail-component">
      <h2>{episode.title}</h2>
      <p>
        <strong>Season:</strong> {episode.season?.title || 'N/A'}
      </p>
      <p>
        <strong>Episode Number:</strong> {episode.episodeNumber}
      </p>
      <p>
        <strong>Series:</strong> {episode.series?.title || 'N/A'}
      </p>
      <p>
        <strong>Production Serial Number:</strong> {episode.productionSerialNumber}
      </p>
      <p>
        <strong>Feature Length:</strong> {episode.featureLength ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Stardate From:</strong> {episode.stardateFrom || 'N/A'}
      </p>
      <p>
        <strong>Stardate To:</strong> {episode.stardateTo || 'N/A'}
      </p>
      <p>
        <strong>US Air Date:</strong> {episode.usAirDate || 'N/A'}
      </p>
      <p>
        <strong>Year From:</strong> {episode.yearFrom || 'N/A'}
      </p>
      <p>
        <strong>Year To:</strong> {episode.yearTo || 'N/A'}
      </p>
    </div>
  );
};

export default Detail;
