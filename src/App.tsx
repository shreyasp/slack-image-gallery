import './App.css';

import { capitalize, map } from 'lodash';
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

import { AppNavBar } from './components/AppNavBar';
import { ImageCards } from './components/ImageCards';
import { fetchImages } from './fetch/FetchImage';
import { UnsplashImage } from './models/UnsplashImage';

export interface IState {
  imageCategory: string;
  images: UnsplashImage[];
  error: Error | undefined;
}

class App extends Component<{}, IState> {
  state: IState = {
    imageCategory: 'oldest',
    images: [],
    error: undefined
  };

  componentDidMount() {
    fetchImages(this.state.imageCategory)
      .then(images => this.setState({ images }))
      .catch(error => this.setState({ error }));
  }

  onCategorySelect = (event: any) => {
    this.setState({
      imageCategory: event.target.id
    });
  }

  static getDerivedStateFromError(error: Error) {
    return ({ error });
  }

  componentDidCatch(error: Error) {
    this.setState({ error })
  }

  componentDidUpdate(prevProps: any, prevState: IState) {
    if(this.state.imageCategory !== prevState.imageCategory) {
      fetchImages(this.state.imageCategory)
        .then(images => this.setState({ images }))
        .catch(error => this.setState({ error }));
    }
  }

  renderCards(image: UnsplashImage, index: number) {
    return(
      <ImageCards
        key={image.id}
        index={index}
        srcURI={image.urls.small}
        altText={capitalize(image.alt_description)}
        caption={capitalize(image.description)}
        likes={image.likes}
      />
    );
  }

  render() {
    if(this.state.error) {
      return (
        <div>
          <AppNavBar/>
          <div>
            <Alert
              variant="danger"
              dismissible={true}
              className="border border-red-light m-3 px-4 py-3 rounded relative overpass"
            >
              {'Something went wrong while trying to fetch images. '}
              <strong>
                {`${this.state.error.message}`}
              </strong>
            </Alert>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <AppNavBar onSelect={this.onCategorySelect}/>
              <div className="container-fluid inline-flex flex-wrap">
                {map(this.state.images, (image, index) => this.renderCards(image, index))}
              </div>
        </div>
      );
    }
  }
}

export default App;
