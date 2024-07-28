import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { Button } from '../../utils/ui/Button/Button.tsx';
import styles from './Flyout.module.css';
import { unselectAllItems } from '../../store/reducers/selectedItemsSlice.ts';
import { IEpisode } from '../../interfaces/IEpisode';

const Flyout: FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.selectedItems) as IEpisode[];

  const handleDownload = () => {
    const CSV =
      'data:text/csv;charset=utf-8,' +
      selectedItems
        .map(
          (item: IEpisode) =>
            `
            ${item.title},
            ${item.usAirDate},
            ${item.uid},
            ${item.episode?.title},
            ${item.episode?.directors.map((item) => item.name)},
            ${item.episode?.characters.map((item) => item.name)}
            `,
        )
        .join('\n');
    const encodedUri = encodeURI(CSV);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_episodes.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUnselectAll = () => {
    dispatch(unselectAllItems());
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles['flyout']}>
      <div className={styles['flyout-wrapper']}>
        <p className={styles['counter']}>
          Selected: <span>{selectedItems.length}</span>
        </p>
        <Button onClick={handleDownload}>Download</Button>
        <Button onClick={handleUnselectAll}>Unselect all</Button>
      </div>
    </div>
  );
};

export default Flyout;
