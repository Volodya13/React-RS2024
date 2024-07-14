// src/components/DetailComponent.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Episode, FetchEpisodes } from '../../services/DataFetch';
import './Detail.css';

const DetailComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchEpisodes = new FetchEpisodes();

  useEffect(() => {
    fetchEpisodes
      .getEpisodeById(id!)
      .then((response) => {
        setEpisode(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <div className="detail-component">
      <h2>{episode.title}</h2>
      <p>
        <strong>Season:</strong> {episode.seasonNumber}
      </p>
      <p>
        <strong>Episode:</strong> {episode.episodeNumber}
      </p>
      <p>
        <strong>Series:</strong> {episode.seriesTitle}
      </p>
      <p>
        <strong>Description:</strong> {episode.uid}
      </p>
    </div>
  );
};

export default DetailComponent;
