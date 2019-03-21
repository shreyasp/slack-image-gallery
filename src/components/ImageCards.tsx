import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';

export interface IProps {
    index: number;
    srcURI: string;
    altText: string;
    caption: string;
    likes?: number;
}

class ImageCards extends React.Component<IProps, {}> {
    render() {
        return(
            <Card className="w-1/5 m-4 shadow-lg rounded-lg">
                <Card.Img
                    className="rounded-t-lg rounded-b-none img-card-size"
                    variant="top"
                    src={this.props.srcURI}
                />
                <Card.ImgOverlay className="relative">
                    <Card.Text>
                        <span className="absolute pin-l pin-t m-2">
                            <FontAwesomeIcon icon={faHeart}/>
                            <span
                                className="ml-2 overpass font-semibold items-center"
                            >
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
