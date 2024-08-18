import { FormsData } from '../../interfaces/interfaces.tsx';
import styles from './ResultList.module.css';

interface ResultListProps {
  data: FormsData[];
  title: string;
}

function ResultList({ data, title }: ResultListProps) {
  return (
    <div className={styles.results}>
      <h2>{title}</h2>
      {data.map((item, index) => (
        <div className={styles.resultList} key={index}>
          <div className={styles.listItem}>
            Name:
            <span className={styles.description}>{item.name}</span>
          </div>
          <div className={styles.listItem}>
            Age:
            <span className={styles.description}>{item.age}</span>
          </div>
          <div className={styles.listItem}>
            Email:
            <span className={styles.description}>{item.email}</span>
          </div>
          <div className={styles.listItem}>
            Password:
            <span className={styles.description}>{item.password}</span>
          </div>
          {item.profilePicture && (
            <div className={styles.listItem}>
              Profile Picture:
              <img
                className={styles.profilePicture}
                src={item.profilePicture as unknown as string}
                alt="Profile"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ResultList;
