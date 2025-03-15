import ReactModal from 'react-modal';
import css from './ImageModal.module.css';

ReactModal.setAppElement('#root');

export default function ImageModal({ image, isOpen, onClose }) {
  if (!image) return null;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onClose} className={css.modal} overlayClassName={css.overlay}>
      <div className={css.modalContent}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <p>{image.description || 'No description available.'}</p>
        <p>👍 {image.likes}</p>
        <button className={css.button} onClick={onClose}>Close</button>
      </div>
    </ReactModal>
  );
}
