import './App.css';

import axios from 'axios';
import { capitalize, map, reverse, sortBy } from 'lodash';
import React, { Component } from 'react';

import { AppNavBar } from './components/AppNavBar';
import { ImageCards } from './components/ImageCards';
import { UnsplashImage } from './models/UnsplashImage';

export interface IState {
  imageCategory: string;
  images: UnsplashImage[];
}

class App extends Component<{}, IState> {
  state: IState = {
    imageCategory: 'oldest',
    images: []
  };

  componentDidMount() {
    axios.get(`https://api.unsplash.com/photos`, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      },
      params: {
        order_by: this.state.imageCategory,
        per_page: 12
      }
    })
      .then(response => response.data)
      .then(images => {
        console.log(sortBy(images, 'likes'));
        this.setState({ images: reverse(sortBy(images, 'likes')) })
      })
      .catch(err => console.log(err));
  }

  onCategorySelect = (event: any) => {
    this.setState({
      imageCategory: event.target.id
    });
  }

  componentDidUpdate(prevProps: any, prevState: IState) {
    if(this.state.imageCategory !== prevState.imageCategory) {
      axios.get(`https://api.unsplash.com/photos`, {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      },
      params: {
        order_by: this.state.imageCategory,
        per_page: 12
      }
    })
      .then(response => response.data)
      .then(images => {
        console.log(sortBy(images, 'likes'));
        this.setState({ images: reverse(sortBy(images, 'likes')) })
      })
      .catch(err => console.log(err));
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

export default App;
