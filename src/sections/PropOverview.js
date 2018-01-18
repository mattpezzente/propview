import React, { Component } from 'react';
import '../styles/css/PropOverview.css';

class PropOverview extends Component {
  render() {
    let homeDescription = ''
    if (this.props.propData) {
      homeDescription = this.props.propData.homeDescription._text
    }
    return (
      <section className="prop-container">
        <div className="prop-wrapper">
          <div className="seperator-container">
            <div className="orange-line-accent"></div><h2>Overview</h2><div className="orange-line-accent"></div>
          </div>
          <span className="propover-map"></span>
          <p>{homeDescription}</p>        
        </div>
      </section>
    );
  }
}

export default PropOverview;
