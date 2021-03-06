import "./App.css";

import {
  faAngleDoubleUp,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize, clone, findIndex, map, sample } from "lodash";
import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { BeatLoader } from "react-spinners";

import { AppNavBar } from "./components/AppNavBar";
import { ImageCards } from "./components/ImageCards";
import { Lightbox } from "./components/Lightbox";
import { fetchImages } from "./fetch/FetchImage";
import { UnsplashImage } from "./models/UnsplashImage";

export interface IState {
  images: UnsplashImage[];
  error: Error | undefined;
  page: number;
  hasLoaded: boolean;
  scrolled: boolean;
  openBox: boolean;
  currentImageIndex: number;
}

const IMAGECATEGORY: string[] = ["popular", "latest", "oldest"];

class App extends Component<{}, IState> {
  state: IState = {
    images: [],
    error: undefined,
    page: 1,
    hasLoaded: false,
    scrolled: false,
    openBox: false,
    currentImageIndex: -1
  };

  componentDidMount() {
    fetchImages(sample(IMAGECATEGORY), this.state.page)
      .then(fetchedImages => {
        let { images, page } = clone(this.state);

        images = images.concat(fetchedImages);
        images = images;
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
      currentImageIndex: index
    });
  };

  onButtonClicked = (buttonName: string) => {
    if (buttonName === "prev") {
      this.setState({ currentImageIndex: this.state.currentImageIndex - 1 });
    } else {
      this.setState({ currentImageIndex: this.state.currentImageIndex + 1 });
    }
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
      fetchImages(sample(IMAGECATEGORY), this.state.page)
        .then(fetchedImages => {
          let { images, page } = clone(this.state);

          images = images.concat(fetchedImages);
          images = images;
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
    // Show Overlay Back to Top button while you we reach client max window height
    else if (scrollTop >= clientHeight) this.setState({ scrolled: true });
    // Hide once you reach back on Top
    else if (!scrollTop) this.setState({ scrolled: false });
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
        userName={image.user.first_name}
        onCardClick={this.onCardClick}
      />
    );
  }

  render() {
    const index = this.state.currentImageIndex;

    if (this.state.error) {
      return (
        <div className="App app-bg">
          <AppNavBar />
          <div>
            <Alert className="text-black border-l-4 border-red-light m-3 px-4 py-3 relative unslack-font">
              <FontAwesomeIcon className="mr-2" icon={faExclamationCircle} />
              {"Something went wrong while trying to fetch images. "}
              <strong>{`${this.state.error.message}`}</strong>
            </Alert>
          </div>
        </div>
      );
    } else if (!this.state.hasLoaded) {
      return (
        <div className="App app-bg">
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
      const layoutHeight =
        document.documentElement.clientHeight === document.body.scrollHeight;
      const buttonDisplay = {
        display: this.state.scrolled || layoutHeight ? "block" : "none"
      };
      return (
        <div className="App app-bg">
          <AppNavBar />
          <div>
            <button
              className="overlay-button text-white bg-black rounded-full h-16 w-16 flex items-center justify-center"
              style={buttonDisplay}
              onClick={this.scrollToTop}
            >
              <FontAwesomeIcon icon={faAngleDoubleUp} />
            </button>
          </div>
          <div className="w-full lg:max-w-3xl mx-auto flex flex-wrap px-3 mt-6">
            {map(this.state.images, (image, index) =>
              this.renderCards(image, index)
            )}
          </div>
          {!this.state.hasLoaded && this.state.scrolled && (
            <div>
              <span className="centered">
                <BeatLoader
                  loading={!this.state.hasLoaded}
                  sizeUnit={"px"}
                  size={20}
                  color={"#22292f"}
                />
              </span>
            </div>
          )}
          {this.state.openBox && index !== -1 && (
            <Lightbox
              openBox={this.state.openBox}
              images={this.state.images}
              index={index}
              onButtonClicked={this.onButtonClicked}
              onClosed={this.modalClosed}
            />
          )}
        </div>
      );
    }
  }
}

export default App;
