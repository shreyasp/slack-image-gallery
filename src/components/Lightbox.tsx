import {
  faChevronCircleLeft,
  faChevronCircleRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Modal } from "react-bootstrap";

import { UnsplashImage } from "../models/UnsplashImage";

export interface IProps {
  openBox: boolean;
  images: UnsplashImage[];
  index: number;
  onButtonClicked: (name: string) => void;
  onClosed: () => void;
}

class Lightbox extends React.Component<IProps, {}> {
  modalClosed = () => {
    this.props.onClosed();
  };

  onPrevButtonClicked = () => {
    this.props.onButtonClicked("prev");
  };

  onNextButtonClicked = () => {
    this.props.onButtonClicked("next");
  };

  render() {
    let { index } = this.props;
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
          className=""
        >
          <Modal.Body className="min-w-full">
            <button
              id="prev"
              className="prev-button text-grey"
              style={prevButtonHide}
              onClick={this.onPrevButtonClicked}
            >
              <FontAwesomeIcon icon={faChevronCircleLeft} size="3x" />
            </button>
            <span>
              <img
                className="img-responsive w-full h-full"
                src={this.props.images[index].urls.full}
              />
            </span>
            <button
              className="next-button text-grey shadow"
              style={nextButtonHide}
              onClick={this.onNextButtonClicked}
            >
              <FontAwesomeIcon icon={faChevronCircleRight} size="3x" />
            </button>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export { Lightbox };
