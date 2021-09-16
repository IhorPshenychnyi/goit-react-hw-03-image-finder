import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import imageAPI from '../../services/apiService';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    pictures: [],
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.searchQuery;
    const nextQuery = this.props.searchQuery;
    const prevPage = prevProps.page;
    const currentPage = this.props.page;

    if (prevQuery !== nextQuery) {
      this.setState({ status: 'pending' });

      imageAPI
        .fetchGallery(nextQuery, currentPage)
        .then(images => {
          if (images.total > 0) {
            this.setState({
              pictures: images.hits,
              status: 'resolved',
            });
          } else {
            this.setState({
              error: `Not found ${nextQuery}`,
              status: 'rejected',
            });
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevPage !== currentPage && currentPage > 1) {
      imageAPI
        .fetchGallery(nextQuery, currentPage)
        .then(images => {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...images.hits],
            status: 'resolved',
          }));
        })
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onOpenModal = (imageURL, alt) => {
    this.setState({
      largeImageURL: imageURL,
      alt: alt,
    });
  };

  onCloseModal = () => {
    this.setState({
      largeImageURL: '',
      alt: '',
    });
  };

  render() {
    const { pictures, error, status, largeImageURL, alt } = this.state;
    const { clickButton } = this.props;

    if (status === 'idle') {
      return <p>Enter something</p>;
    }

    if (status === 'pending') {
      return (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
          timeout={3000}
        />
      );
    }

    if (status === 'rejected') {
      return <p>{error}</p>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className={s.ImageGallery}>
            {pictures.map(picture => (
              <ImageGalleryItem
                key={picture.id}
                webformatURL={picture.webformatURL}
                largeImageURL={picture.largeImageURL}
                alt={picture.tags}
                onOpenModal={this.onOpenModal}
              />
            ))}
          </ul>
          <Button onClick={clickButton} />
          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={alt}
              onClose={this.onCloseModal}
            />
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  clickButton: PropTypes.func.isRequired,
};

export { ImageGallery };
