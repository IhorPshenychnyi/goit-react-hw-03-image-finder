import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt,
  onOpenModal,
}) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onOpenModal(largeImageURL, alt)}
    >
      <img src={webformatURL} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export { ImageGalleryItem };
