import './App.css';

import { capitalize, clone, map, reverse, sortBy } from 'lodash';
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
  page: number;
}

class App extends Component<{}, IState> {
  state: IState = {
    imageCategory: 'oldest',
    images: [],
    error: undefined,
    page: 1
  };

  onCategorySelect = (event: any) => {
    this.setState({
      imageCategory: event.target.id,
      images: [],
      error: undefined,
      page: 1
    });
  }

  componentDidMount() {
    fetchImages(this.state.imageCategory, this.state.page)
      .then(fetchedImages => {
        let { images, page } = clone(this.state)

        images = images.concat(fetchedImages);
        images = reverse(sortBy(images, "likes"))
        page += 1


        this.setState({
          images,
          page
        });
      })
      .catch(error => this.setState({ error }));

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps: any, prevState: IState) {
    if(this.state.imageCategory !== prevState.imageCategory) {
      fetchImages(this.state.imageCategory)
        .then(fetchedImages => {
          let { images, page } = clone(this.state)

          images = images.concat(fetchedImages);
          images = reverse(sortBy(images, "likes"))
          page += 1

          this.setState({
            images,
            page
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    var scrollTop = (
      (
        document.documentElement && document.documentElement.scrollTop
      ) || document.body.scrollTop
    );

    var scrollHeight = (
      (
        document.documentElement && document.documentElement.scrollHeight
      ) || document.body.scrollHeight
    );
    var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if(scrolledToBottom) {
      fetchImages(this.state.imageCategory, this.state.page)
        .then(fetchedImages => {
          let { images, page } = clone(this.state)

          images = images.concat(fetchedImages);
          images = reverse(sortBy(images, "likes"))
          page += 1

          this.setState({
            images,
            page
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  renderCards(image: UnsplashImage, index: number) {
    return(
      <ImageCards
        key={`${image.id}-${index}`}
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
              <div className="items-center content-center container-fluid inline-flex flex-wrap">
                {map(this.state.images, (image, index) => this.renderCards(image, index))}
              </div>
        </div>
      );
    }
  }
}

export default App;
