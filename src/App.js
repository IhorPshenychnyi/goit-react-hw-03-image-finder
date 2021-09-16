import React, { Component } from 'react';

import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

import './App.css';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.resetPage();
  };

  nextPage = () => {
    return this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  resetPage = () => {
    return this.setState({ page: 1 });
  };

  render() {
    const { searchQuery, page } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          clickButton={this.nextPage}
        />
      </div>
    );
  }
}

export default App;
