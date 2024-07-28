import styles from './Results.module.css';
import { Spinner } from '../Spinner/Spinner';
import { useGetAllEpisodesQuery } from '../../services/episodesApi';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination.tsx';
import { Input } from '../../utils/ui/Input/Input.tsx';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  selectItem,
  unselectItem,
  unselectAllItems,
  selectItems,
} from '../../store/reducers/selectedItemsSlice';
import { IEpisode } from '../../interfaces/IEpisode.ts';

const Results: FC = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '0', 10);
  const { data, isError, isLoading } = useGetAllEpisodesQuery(page);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.selectedItems);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    setSelectAllChecked(
      !(
        !data ||
        !data.episodes.every((episode: IEpisode) =>
          selectedItems.some((item) => item.uid === episode.uid),
        )
      ),
    );
  }, [data, selectedItems]);

  const handleEpisodeClick = (episodeId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    navigate(`/details/${episodeId}?${params.toString()}`);
  };

  const handleCheckboxChange = (episode: IEpisode, isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectItem(episode));
    } else {
      dispatch(unselectItem(episode.uid));
    }
  };

  const handleSelectAllChange = (isChecked: boolean | undefined) => {
    const checked = isChecked ?? false;
    if (checked && data) {
      dispatch(selectItems(data.episodes));
    } else {
      dispatch(unselectAllItems());
    }
    setSelectAllChecked(checked);
  };

  return (
    <div className={styles['results']}>
      {isLoading && <Spinner />}
      {isError && <div>Something went wrong...</div>}
      {data && data.episodes.length === 0 && <div>No episodes available.</div>}
      {data && data.episodes.length > 0 && (
        <>
          <div className={styles['select-all']}>
            <Input
              value={''}
              type="checkbox"
              checked={selectAllChecked}
              onChange={(e) => handleSelectAllChange(e.target.checked)}
            />
            <label>Select All</label>
          </div>
          <ul>
            {data.episodes.map((episode) => (
              <li className={styles['results__item']} key={episode.uid}>
                <Input
                  className={styles['results__item-checkbox']}
                  value={''}
                  type={'checkbox'}
                  checked={selectedItems.some((item) => item.uid === episode.uid)}
                  onChange={(e) => handleCheckboxChange(episode, e.target.checked)}
                />
                <span
                  className={styles['results__item-title']}
                  onClick={() => handleEpisodeClick(episode.uid)}
                >
                  {episode.title}
                </span>
                <span className={styles['results__item-date']}>{episode.usAirDate}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <Pagination />
    </div>
  );
};

export default Results;
