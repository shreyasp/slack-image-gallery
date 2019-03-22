import { faHeart } from "@fortawesome/free-solid-svg-icons";
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
  onCardClick?: (event: any) => void;
}

class ImageCards extends React.Component<IProps, {}> {
  render() {
    return (
      <Card className="w-1/5 m-4 shadow-lg" onClick={this.props.onCardClick}>
        <Card.Img
          id={this.props.imageId}
          className="img-card-size"
          variant="top"
          src={this.props.srcURI}
        />
        <Card.ImgOverlay className="relative">
          <Card.Text>
            <span className="absolute pin-l pin-t m-2">
              <FontAwesomeIcon icon={faHeart} />
              <span className="ml-2 overpass font-semibold items-center">
                {this.props.likes || 0}
              </span>
            </span>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    );
  }
}

export { ImageCards };
