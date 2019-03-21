import './App.css';

import { map, random, range } from 'lodash';
import React, { Component } from 'react';

import { AppNavBar } from './components/AppNavBar';
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
      <div className="App">
        <AppNavBar/>
        <div className="container-fluid inline-flex flex-wrap">
          {map(range(1, 25, 1), (x) => this.renderCards(x))}
        </div>
      </div>
    );
  }
}

export default App;
