import { useEffect, useState } from 'react';
import fetchPhotos from "components/services/pixabayImages";
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from 'components/Button/Button';
import { Container, ImageGalleryList, Text } from './ImageGallery.styled';

const ImageGallery = ({ searchQuery, showModal }) => {
  
  const [imageList, setImageList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  const getImages = (searchQuery, page) => fetchPhotos(searchQuery, page)
    .then(data => {
      setImageList((hue) => hue.concat(data.hits));
      setTotalPage(data.totalPage)
      setStatus('resolved')
    })
    .catch(error => {
      setError(error);
      setStatus('rejected');
    });
    
  useEffect(() => {
    if (!searchQuery) return

    setImageList([]);
    setPage(1);
    setStatus('pending')

    getImages(searchQuery, 1)

  }, [searchQuery]);
  
  useEffect(() => {
    if (page === 1) return;

    setStatus('pending')
    getImages(searchQuery, page)
  }, [page, searchQuery]);

  const handlerBtnClick = () => {
    setPage(prevPage => prevPage + 1)
  };

  if (status === 'idle') {
    return <Text>Enter a search query</Text>;
  }

  if (status === 'pending' && imageList.length === 0) {
    return <Container><Loader visible /></Container>;
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      {imageList.length === 0 && <Text>Nothing was found for this query</Text>}
      <ImageGalleryList>
        {imageList.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            openModal={() => showModal({ largeImageURL, tags })} />
        ))}
      </ImageGalleryList>

      {page < totalPage && <LoadMoreBtn isLoading={status === 'pending'} onClick={handlerBtnClick} />}
    </div>
  );
};

export default ImageGallery;
