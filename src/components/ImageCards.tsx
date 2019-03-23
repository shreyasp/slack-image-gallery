import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card } from "react-bootstrap";

import { UnsplashImage } from "../models/UnsplashImage";

export interface IProps {
  imageId: string;
  index: number;
  srcURI: string;
  altText: string;
  caption: string;
  likes?: number;
  userName?: string;
  onCardClick?: (event: any) => void;
}

class ImageCards extends React.Component<IProps, {}> {
  render() {
    return (
      <div className="w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 my-3">
        <Card
          className="max-w-sm rounded overflow-hidden border-none mx-3 mb-6 image-card"
          onClick={this.props.onCardClick}
        >
          <Card.Img
            id={this.props.imageId}
            className="block w-full h-64 object-cover"
            variant="top"
            src={this.props.srcURI}
          />
          <Card.ImgOverlay className="relative text-grey-darker">
            <Card.Text>
              <span className="absolute pin-l pin-t ml-2 mt-2 user-name">
                <span className="unslack-font font-normal items-center">
                  {`By ${this.props.userName}` || ""}
                </span>
              </span>
              <span className="absolute pin-r pin-t mr-2 mt-2">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-red-light likes-heart"
                />
                <span className="unslack-font ml-1 font-normal items-center likes">
                  {this.props.likes || 0}
                </span>
              </span>
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
    );
  }
}

export { ImageCards };
