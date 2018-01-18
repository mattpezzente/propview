import React, { Component } from 'react';
import '../styles/css/LandPrompt.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

class LandPrompt extends Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)
  }

  render() {
    return (
      <div className="land-prompt-container">
        <img src={require ("../images/propview-logo.png")} alt="" height="50%" width="70%"/>        
        <SearchBar getData={this.getData}></SearchBar>
        <div className="seperator-container">
          <div className="orange-line-accent"></div><h5>OR</h5><div className="orange-line-accent"></div>
        </div>
        <SearchHere getData={this.getData} btnText="Get Current Location"></SearchHere>
      </div>
    );
  }

  getData(data) {
    this.props.getData(data)
  }
}

export default LandPrompt;
