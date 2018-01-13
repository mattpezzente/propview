import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/Landing.css'

let windowDimensions = {
    height: window.innerHeight,
};

class Landing extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section style={windowDimensions} className='landing'></section>
    );
  }
}

export default Landing;
