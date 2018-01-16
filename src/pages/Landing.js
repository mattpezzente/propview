import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';

let windowDimensions = {
    height: window.innerHeight - 32,
};

class Landing extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section style={windowDimensions} className='landing'>
        <LandPrompt />
      </section>
    );
  }
}

export default Landing;
