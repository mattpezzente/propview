import { Component } from 'react';
import '../styles/css/PropOverview.css';

class PropOverview extends Component {
  constructor(props) {
    super(props);
    // Local props object for fallbacks, and storage of incoming props
    this.localProps = {
      homeDesc: 'OVERVIEW UNAVAILABLE...',
      address1: 'Cinderellas',
      address2: 'Castle',
    };
  }

  render() {
    // Check if there is data in the props
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps = {
        homeDesc: this.props.propData.overview,
        address1: this.props.propData.address1,
        address2: this.props.propData.address2
      };
    }
    return (
      <section className="prop-container">
        <div className="prop-wrapper">
          <div className="seperator-container" style={{ marginBottom: '2rem' }}>
            <div className="orange-line-accent"></div><h2>Overview</h2><div className="orange-line-accent"></div>
          </div>
          <iframe
            className="propover-map"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Google Maps"
            src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyBR2rwBhZoIXY4Pm53DVcF07KSHq5AOIy4&zoom=15&q=' + this.localProps.address1 + ',' + this.localProps.address2} allowFullScreen>
          </iframe>
          <p>{this.localProps.homeDesc}</p>
        </div>
      </section>
    );
  }
}

export default PropOverview;
