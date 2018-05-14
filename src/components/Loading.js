import React, { Component } from 'react';
import imgLogo from '../images/propview-logo.png';
import gifLoader from '../images/propview-loader.gif';
import '../styles/css/Loading.css';

/*
* Persistent component, that shows a loading overlay whenever data is being loaded.
*/

class Loading extends Component {
  render() {
    let loadClass;
    if (this.props.loading) {
      loadClass = 'overlay';
    } else {
      loadClass = 'overlay-hidden';
    }
    return (
      <div className={loadClass}>
        <img className="overlay-logo" src={imgLogo} alt="propview logo"/>
        <img className="overlay-loader" src={gifLoader} alt="propview loading indicator"/>
      </div>
    );
  }
}

export default Loading;
