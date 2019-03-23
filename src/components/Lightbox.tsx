import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal } from "react-bootstrap";

import { UnsplashImage } from "../models/UnsplashImage";

export interface IProps {
  openBox: boolean;
  images: UnsplashImage[];
  index: number;
  onButtonClicked: (event: any) => void;
  onClosed: (closed: boolean) => void;
}

class Lightbox extends React.Component<IProps, {}> {
  modalClosed = () => {
    this.props.onClosed(true);
  };

  render() {
    const prevButtonHide = {
      display: this.props.index === 0 ? "none" : "block"
    };

    const nextButtonHide = {
      display:
        this.props.index === this.props.images.length - 1 ? "none" : "block"
    };

    return (
      <React.Fragment>
        <Modal
          show={this.props.openBox}
          onHide={this.modalClosed}
          centered={true}
          size="lg"
          className="min-w-full"
        >
          <Modal.Body>
            <React.Fragment>
              <button
                id="prev"
                className="text-black border-transparent prev-button hover:transparent"
                style={prevButtonHide}
                onClick={this.props.onButtonClicked}
              >
                <FontAwesomeIcon icon={faChevronCircleLeft} size="3x" />
              </button>
              <span>
                <img
                  className="img-responsive max-w-full max-h-full"
                  src={this.props.images[this.props.index].urls.full}
                />
              </span>
              <button
                id="next"
                className="text-black border-transparent next-button hover:transparent"
                style={nextButtonHide}
                onClick={this.props.onButtonClicked}
              >
                <FontAwesomeIcon icon={faChevronCircleRight} size="3x" />
              </button>
            </React.Fragment>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export { Lightbox };
