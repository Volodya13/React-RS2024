import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export function NotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Ooops.. Maybe it was an another universe or galaxy</p>
      <button onClick={handleBack}>Go back</button>
    </div>
  );
}
