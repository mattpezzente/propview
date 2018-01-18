import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';
import axios from 'axios';

let windowDimensions = {
    height: window.innerHeight - 32,
};

class Landing extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this)
  }

  render() {
    return (
      <section style={windowDimensions} className='landing'>
        <LandPrompt getData={this.getData}/>
      </section>
    );
  }

  getData(data) {
    this.props.getData(data)
  }
}

export default Landing;
