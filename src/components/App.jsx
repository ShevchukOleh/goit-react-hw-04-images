import { useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery'
import Modal from './Modal/Modal';
import { Container } from './App.styled';

const App = () => {
  const [modalImg, setModalImg] = useState({
    largeImageURL: '',
    tags: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const handlerSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  const hideModal = () => {
    setIsShowModal(false);
  }

  const showModal = ({ largeImageURL, tags }) => {
    setModalImg({ largeImageURL, tags });
    setIsShowModal(true);
  }

  return (
    <Container>
      <SearchBar onSubmit={handlerSubmit} />
      <ImageGallery searchQuery={searchQuery} showModal={showModal} />
      {isShowModal && <Modal imgData={modalImg} onClose={hideModal} />}
    </Container>
  )
};

export default App;