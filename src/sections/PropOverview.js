import React, { Component } from 'react';
import '../styles/css/PropOverview.css';

class PropOverview extends Component {
  constructor(props) {
    super(props)
    this.localProps = {
      homeDesc: 'OVERVIEW UNAVAILABLE...',
    }
  }

  render() {
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps = {
        homeDesc: this.props.propData.overview,
      }   
    }
    return (
      <section className="prop-container">
        <div className="prop-wrapper">
          <div className="seperator-container">
            <div className="orange-line-accent"></div><h2>Overview</h2><div className="orange-line-accent"></div>
          </div>
          <span className="propover-map"></span>
          <p>{this.localProps.homeDesc}</p>        
        </div>
      </section>
    );
  }
}

export default PropOverview;
