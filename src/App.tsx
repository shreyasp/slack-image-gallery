import "./App.css";

import {
  faAngleDoubleUp,
  faChevronLeft,
  faChevronRight,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  capitalize,
  clone,
  findIndex,
  isEqual,
  map,
  reverse,
  sortBy
} from "lodash";
import React, { Component } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import { AppNavBar } from "./components/AppNavBar";
import { ImageCards } from "./components/ImageCards";
import { fetchImages } from "./fetch/FetchImage";
import { UnsplashImage } from "./models/UnsplashImage";

export interface IState {
  imageCategory: string;
  images: UnsplashImage[];
  error: Error | undefined;
  page: number;
  hasLoaded: boolean;
  scrolled: boolean;
  openBox: boolean;
  currentImage: UnsplashImage | undefined;
}

class App extends Component<{}, IState> {
  state: IState = {
    imageCategory: "oldest",
    images: [],
    error: undefined,
    page: 1,
    hasLoaded: false,
    scrolled: false,
    openBox: false,
    currentImage: undefined
  };

  onCategorySelect = (event: any) => {
    this.setState({
      imageCategory: event.target.id,
      images: [],
      error: undefined,
      page: 1,
      hasLoaded: false
    });
  };

  componentDidMount() {
    fetchImages(this.state.imageCategory, this.state.page)
      .then(fetchedImages => {
        let { images, page } = clone(this.state);

        images = images.concat(fetchedImages);
        images = reverse(sortBy(images, "likes"));
        page += 1;

        this.setState({
          images,
          page,
          hasLoaded: true
        });
      })
      .catch(error => this.setState({ error }));

    window.addEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps: any, prevState: IState) {
    if (
      (this.state.imageCategory !== prevState.imageCategory ||
        !isEqual(this.state.images, prevState.images)) &&
      !this.state.hasLoaded
    ) {
      fetchImages(this.state.imageCategory)
        .then(fetchedImages => {
          let { images, page } = clone(this.state);

          images = images.concat(fetchedImages);
          images = reverse(sortBy(images, "likes"));
          page += 1;

          this.setState({
            images,
            page,
            hasLoaded: true
          });
        })
        .catch(error => this.setState({ error }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.setState({ scrolled: false });
  };

  onCardClick = (event: any) => {
    const imageId: string = event.target.id;
    const index = findIndex(this.state.images, image => image.id === imageId);

    this.setState({
      openBox: true,
      currentImage: this.state.images[index]
    });
  };

  handleScroll = () => {
    let scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    let scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    let clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      fetchImages(this.state.imageCategory, this.state.page)
        .then(fetchedImages => {
          let { images, page } = clone(this.state);

          images = images.concat(fetchedImages);
          images = reverse(sortBy(images, "likes"));
          page += 1;

          this.setState({
            images,
            page,
            hasLoaded: true,
            scrolled: true
          });
        })
        .catch(error => this.setState({ error }));
    }
  };

  modalClosed = () => {
    this.setState({ openBox: false });
  };

  renderCards(image: UnsplashImage, index: number) {
    return (
      <ImageCards
        key={`${image.id}-${index}`}
        index={index}
        imageId={image.id}
        srcURI={image.urls.small}
        altText={capitalize(image.alt_description)}
        caption={capitalize(image.description)}
        likes={image.likes}
        onCardClick={this.onCardClick}
      />
    );
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <AppNavBar />
          <div>
            <Alert className="text-black border-l-4 border-red-light m-3 px-4 py-3 relative overpass">
              <FontAwesomeIcon className="mr-2" icon={faExclamationCircle} />
              {"Something went wrong while trying to fetch images. "}
              <strong>{`${this.state.error.message}`}</strong>
            </Alert>
          </div>
        </div>
      );
    } else if (!this.state.hasLoaded) {
      return (
        <div>
          <AppNavBar />
          <span className="centered">
            <BeatLoader
              loading={!this.state.hasLoaded}
              sizeUnit={"px"}
              size={20}
              color={"#22292f"}
            />
          </span>
        </div>
      );
    } else {
      const buttonDisplay = {
        display: this.state.scrolled ? "block" : "none"
      };
      return (
        <div className="App">
          <AppNavBar onSelect={this.onCategorySelect} />
          <div>
            <Button
              className="overlay-button bg-black rounded-full h-16 w-16 flex items-center justify-center"
              size="lg"
              style={buttonDisplay}
              onClick={this.scrollToTop}
            >
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            </Button>
          </div>
          <div className="container-fluid inline-flex flex-wrap">
            {map(this.state.images, (image, index) =>
              this.renderCards(image, index)
            )}
          </div>
          {this.state.openBox && (
            <div>
              <Modal
                show={this.state.openBox}
                onHide={this.modalClosed}
                centered={true}
                size="lg"
              >
                <Modal.Body>
                  <div>
                    <Button className="bg-transparent border-transparent prev-button">
                      <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                    </Button>
                    <span>
                      <img
                        className="img-responsive max-w-full max-h-full"
                        src={
                          this.state.currentImage &&
                          this.state.currentImage.urls.full
                        }
                      />
                    </span>
                    <Button className="bg-transparent border-transparent next-button">
                      <FontAwesomeIcon icon={faChevronRight} size="2x" />
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      );
    }
  }
}

export default App;
