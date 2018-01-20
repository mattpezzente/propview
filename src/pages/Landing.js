import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';

let windowDimensions = {
    height: window.innerHeight - 32,
    minHeight: '400px',
};

class Landing extends Component {
  constructor(props) {
    super(props);
    document.title = 'PropView'
    window.onresize = () => {
      windowDimensions = {
        height: window.innerHeight - 32,
        minHeight: '400px',
      };
      this.setState({resize: true})
    }
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
