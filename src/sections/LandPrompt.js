import React, { Component } from 'react';
import '../styles/css/LandPrompt.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

const propviewLogo = require('../images/propview-logo.png');

class LandPrompt extends Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
  }

  render() {
    return (
      <div className="land-prompt-container">
        <img src={propviewLogo} alt="" height="50%" width="70%"/>
        <p className="land-prompt-text">Enter a property address to get its details!</p>
        <SearchBar getData={this.getData}></SearchBar>
        <div className="seperator-container">
          <div className="orange-line-accent"></div><h5>OR</h5><div className="orange-line-accent"></div>
        </div>
        <SearchHere getData={this.getData} btnText="Get Current Location"></SearchHere>
      </div>
    );
  }

  // Method to allow data to be passed through components
  getData(data) {
    this.props.getData(data);
  }
}

export default LandPrompt;
