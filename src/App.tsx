import './App.css';

import { map, random, range } from 'lodash';
import React, { Component } from 'react';

import { ImageCards } from './components/ImageCards';

class App extends Component {
  renderCards(index: number) {
    return(
      <ImageCards
        index={index}
        srcURI={'https://tailwindcss.com/img/card-top.jpg'}
        altText={'Sunset in the mountains'}
        caption={'The Coldest Sunset'}
        likes={String(random(100, 1000))}
      />
    );
  }

  render() {
    return (
      <div className="App container-fluid inline-flex flex-wrap">
        {map(range(1, 25, 1), (x) => this.renderCards(x))}
      </div>
    );
  }
}

export default App;
