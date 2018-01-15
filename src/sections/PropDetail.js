import React, { Component } from 'react';
import icoYearBuilt from '../images/icons/details/propview-built-icon.png';
import icoType from '../images/icons/details/propview-type-icon.png';
import icoCooling from '../images/icons/details/propview-cooling-icon.png';
import icoHeating from '../images/icons/details/propview-heating-icon.png';
import icoPool from '../images/icons/details/propview-pool-icon.png';
import icoLot from '../images/icons/details/propview-lot-icon.png';
import icoRoof from '../images/icons/details/propview-roof-icon.png';
import icoWall from '../images/icons/details/propview-walls-icon.png';
import '../styles/css/PropDetail.css';

class PropDetail extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props.propData)
    return (
      <section className="prop-container off-white">
        <div className="prop-wrapper">
          <div className="two-col-container">
            <section className="two-col">
              <h2>Features</h2>
              <ul className="two-col-container">
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoYearBuilt} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoPool} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoType} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoLot} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoCooling} alt="year built icon" />
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoRoof} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoHeating} alt="year built icon" />
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="detail-img-container">
                    <img className="detail-img" src={icoWall} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
              </ul>
            </section>
            <section className="two-col">
              <h2>Details</h2>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

export default PropDetail;
