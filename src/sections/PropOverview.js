import React, { Component } from 'react';
import '../styles/css/PropOverview.css';

class PropOverview extends Component {
  constructor(props) {
    super(props)
    this.localProps = {
      homeDesc: 'OVERVIEW UNAVAILABLE...',
      addressPlus: 'Cinderellas+Castle'
    }
  }

  render() {
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps = {
        homeDesc: this.props.propData.overview,
        addressPlus: this.props.propData.addressPlus
      }
      console.log(this.props.propData)
    }
    return (
      <section className="prop-container">
        <div className="prop-wrapper">
          <div className="seperator-container" style={{marginBottom: '2rem'}}>
            <div className="orange-line-accent"></div><h2>Overview</h2><div className="orange-line-accent"></div>
          </div>
          <iframe
            className="propover-map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyBR2rwBhZoIXY4Pm53DVcF07KSHq5AOIy4&zoom=15&q='+this.localProps.addressPlus} allowFullScreen>
          </iframe>
          <p>{this.localProps.homeDesc}</p>        
        </div>
      </section>
    );
  }
}

export default PropOverview;
