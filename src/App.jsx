import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './services/api';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchImages(query, page);
        setImages(prev => [...prev, ...data.results]);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = newQuery => {
    if (!newQuery) {
      toast.error('Please enter text to search images.');
      return;
    }
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const loadMore = () => setPage(prev => prev + 1);

  const openModal = image => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={openModal} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={loadMore} />}

      <ImageModal image={selectedImage} isOpen={showModal} onClose={closeModal} />
    </>
  );
}
