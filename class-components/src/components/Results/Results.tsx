import styles from './Results.module.css';
import { Spinner } from '../Spinner/Spinner';
import { useGetAllEpisodesQuery } from '../../services/episodesApi.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { FC, useEffect } from 'react';
import { setPageNumber, setTotalPages } from '../../store/reducers/paginationSlice.ts';
import { Button } from '../../utils/ui/Button/Button.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Results: FC = () => {
  const dispatch = useAppDispatch();
  const { pageNumber, pageSize } = useAppSelector((state) => state.pagination);
  const { data, isError, isLoading } = useGetAllEpisodesQuery({ pageNumber, pageSize });
  const totalPages = useAppSelector((state) => state.pagination.totalPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '0', 10);
    console.log('Setting page number from URL:', page);
    dispatch(setPageNumber(page));
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (data) {
      console.log('Setting total pages from data:', data.page.totalPages);
      dispatch(setTotalPages(data.page.totalPages));
    }
  }, [data, dispatch]);

  const handlePrev = () => {
    if (pageNumber > 0) {
      const newPageNum = pageNumber - 1;
      console.log('Previous page:', newPageNum);
      dispatch(setPageNumber(newPageNum));
      setSearchParams({ page: newPageNum.toString() });
      navigate(`?page=${newPageNum}`);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages - 1) {
      const newPageNum = pageNumber + 1;
      console.log('Next page:', newPageNum);
      dispatch(setPageNumber(newPageNum));
      setSearchParams({ page: newPageNum.toString() });
      navigate(`?page=${newPageNum}`);
      console.log('newPageNum', newPageNum);
    }
  };

  const handleEpisodeClick = (episodeId: string) => {
    navigate(`/details/${episodeId}`);
  };

  return (
    <div className={styles['results']}>
      {isLoading && <Spinner />}
      {isError && <div>Something went wrong...</div>}
      {data && (
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
      <div className={styles['pagination']}>
        <Button
          onClick={handlePrev}
          className={styles['pagination-button']}
          disabled={pageNumber <= 0}
        >
          Previous
        </Button>
        <span className={styles['pagination-info']}>
          {/*Page {data?.page.pageNumber + 1} of {data?.page.totalPages}*/}
        </span>
        <Button
          onClick={handleNext}
          className={styles['pagination-button']}
          disabled={pageNumber >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Results;
