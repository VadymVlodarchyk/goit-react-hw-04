import { PuffLoader } from 'react-spinners';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <PuffLoader size={60} color="#3f51b5" />
    </div>
  );
}
