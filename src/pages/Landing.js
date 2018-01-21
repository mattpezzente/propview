import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    document.title = 'PropView'
    this.randImg = 'landing landing-' + Math.floor(Math.random() * 7 + 1)
    
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    document.querySelector('.landing').style.height = window.innerHeight.toString() + "px"
    window.onresize = () => {      
      document.querySelector('.landing').style.height = window.innerHeight.toString() + "px"
    }
  }

  componentWillUnmount() {
    window.onresize = null
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
