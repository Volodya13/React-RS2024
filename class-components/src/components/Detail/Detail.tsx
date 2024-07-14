import React, { useEffect, useState } from 'react';
import { Episode, FetchEpisodes } from '../../services/DataFetch';
import './Detail.css';

interface DetailComponentProps {
  id: string;
}

const Detail: React.FC<DetailComponentProps> = ({ id }) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const fetchEpisodes = new FetchEpisodes();
        const result = await fetchEpisodes.getEpisodeById(id);
        setEpisode(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!episode) {
    return <div>No episode data found.</div>;
  }

  return (
    <div className="detail-component">
      <h2>{episode.title}</h2>
      <p>
        <strong>Season:</strong> {episode.season?.title}
      </p>
      <p>
        <strong>Episode:</strong> {episode.episodeNumber}
      </p>
      <p>
        <strong>Series:</strong> {episode.series?.title}
      </p>
      <p>
        <strong>Directors:</strong> {episode.directors?.map((item) => item.name)}
      </p>
      <p>
        <strong>Writers:</strong> {episode.writers?.map((item): string => item.name).join(', ')}
      </p>
    </div>
  );
};

export default Detail;
