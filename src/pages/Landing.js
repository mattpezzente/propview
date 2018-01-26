import React, { Component } from 'react';
import LandPrompt from '../sections/LandPrompt';
import '../styles/css/Landing.css';

/*
* Initial page for users to start their first query for properties.
*/

class Landing extends Component {
  constructor(props) {
    super(props);
    // Set Page Title
    document.title = 'PropView'
    // Randomly set the background image on the landing page
    this.randImg = 'landing landing-' + Math.floor(Math.random() * 7 + 1)

    
    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    // Dynamically resize height of landing page
    document.querySelector('.landing').style.height = window.innerHeight.toString() + "px"
    window.onresize = () => {      
      document.querySelector('.landing').style.height = window.innerHeight.toString() + "px"
    }
  }

  componentWillUnmount() {
    // Remove height resize event as component is UnMounted
    window.onresize = null
  }

  render() {
    return (      
      <section style={this.windowDimensions} className={this.randImg}>
        <LandPrompt getData={this.getData}/>
      </section>
    );
  }

  // Method to allow data to be passed through components 
  getData(data) {
    this.props.getData(data)
  }
}

export default Landing;
