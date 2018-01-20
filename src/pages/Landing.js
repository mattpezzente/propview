import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    document.title = 'PropView'
    this.windowDimensions = {
        height: window.innerHeight,
        minHeight: '400px',
    };
    this.randImg = 'landing landing-' + Math.floor(Math.random() * 7 + 1)
    
    window.onresize = () => {
      this.windowDimensions = {
        height: window.innerHeight,
      };
      this.setState({resize: true})
    }
    this.getData = this.getData.bind(this)
  }

  render() {
    return (      
      <section style={this.windowDimensions} className={this.randImg}>
        <LandPrompt getData={this.getData}/>
      </section>
    );
  }

  getData(data) {
    this.props.getData(data)
  }
}

export default Landing;
