import React, { Component } from 'react';
import '../styles/css/LandPrompt.css';

class LandPrompt extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="land-prompt-container">
        <img src={require ("../images/propview-logo.png")} alt="" height="50%" width="70%"/>
        <p></p>
        <div className="seperator-container">
          <div className="orange-line-accent"></div><h5>OR</h5><div className="orange-line-accent"></div>
        </div>
      </div>
    );
  }
}

export default LandPrompt;
