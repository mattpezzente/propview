import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/PropHead.css';

class PropHead extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.propData)
    return (
      <section className="prophead-masthead">
        <Link to="/"><img className="prophead-logo" src={require('../images/propview-logo.png')} alt="PropView Logo"/></Link>  
        <div className="prophead-info-container">
          <h3>{this.props.propData.address.line1}</h3>
          <h3>{this.props.propData.address.line2}</h3>            
          <ul className="prophead-info-details">
            <li>
              <span className="icon-bedrooms"></span>
              <p>{this.props.propData.building.rooms.beds} Beds</p>            
            </li>
            <li>
              <span className="prophead-info-dot-spacing">•</span>
            </li>
            <li>
              <span className="icon-baths"></span>
              <p>{this.props.propData.building.rooms.bathstotal} Baths</p>
            </li>
            <li>
              <span className="prophead-info-dot-spacing">•</span>
            </li>
            <li>
              <span className="icon-sqrft"></span>     
              <p>{this.props.propData.building.size.bldgsize} Squarefeet</p>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default PropHead;
