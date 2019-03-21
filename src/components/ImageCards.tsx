import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export interface IProps {
    index: number;
    srcURI: string;
    altText: string;
    caption: string;
    likes?: string;
}

class ImageCards extends React.Component<IProps, {}> {
    render() {
        return(
            <div key={this.props.index} className="w-1/5 max-w-sm m-2 rounded overflow-hidden shadow-md">
                <img className="w-full" src={this.props.srcURI} alt={this.props.altText} />
                <div className="relative px-3 py-4">
                    <div className="absolute pin-r pin-t mt-1 mr-2">
                        <FontAwesomeIcon icon={faHeart}/>
                        <span className="ml-2">{this.props.likes || 0}</span>
                    </div>
                    <div className="absolute pin-l pin-t ml-2 mt-1 font-bold">
                        {this.props.caption}
                    </div>
                </div>
            </div>
        );
    }
}

export { ImageCards };
