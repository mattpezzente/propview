import React, { Component } from 'react';
import icoYearBuilt from '../images/icons/features/propview-built-icon.png';
import icoType from '../images/icons/features/propview-type-icon.png';
import icoCooling from '../images/icons/features/propview-cooling-icon.png';
import icoHeating from '../images/icons/features/propview-heating-icon.png';
import icoPool from '../images/icons/features/propview-pool-icon.png';
import icoLot from '../images/icons/features/propview-lot-icon.png';
import icoRoof from '../images/icons/features/propview-roof-icon.png';
import icoWall from '../images/icons/features/propview-walls-icon.png';
import '../styles/css/PropDetail.css';

class Propfeature extends Component {
  constructor(props) {
    super(props);

    this.toTitleCase = this.toTitleCase.bind(this)
    this.toCommaNumber = this.toCommaNumber.bind(this) 
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    console.log(this.props.propData)
    return (
      <section className="prop-container off-white">
        <div className="prop-wrapper">
          <div className="two-col-container">
            <section className="two-col orange-border-right">
              <h2>Features</h2>
              <ul className="two-col-container">
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoYearBuilt} alt="year built icon"/>
                  </div>
                  <h3>Year Built</h3>
                  <p>{this.props.propData.building.summary.yearbuilteffective}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoPool} alt="year built icon"/>
                  </div>
                  <h3>Pool</h3>
                  <p>{this.props.propData.lot.poolind = "Y" ? 'Yes' : 'No'}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoType} alt="year built icon"/>
                  </div>
                  <h3>Building Type</h3>
                  <p>{this.toTitleCase(this.props.propData.building.summary.bldgType)}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoLot} alt="year built icon"/>
                  </div>
                  <h3>Lot</h3>
                  <p>{this.toCommaNumber(this.props.propData.lot.lotsize2) + ' sqft'}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoCooling} alt="year built icon" />
                  </div>
                  <h3>Cooling</h3>
                  <p>{this.toTitleCase(this.props.propData.utilities.coolingtype)}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoRoof} alt="year built icon"/>
                  </div>
                  <h3>Roof</h3>
                  <p>{this.toTitleCase(this.props.propData.building.construction.roofcover)}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoHeating} alt="year built icon" />
                  </div>
                  <h3>Heating</h3>
                  <p>{this.toTitleCase(this.props.propData.utilities.heatingtype)}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoWall} alt="year built icon"/>
                  </div>
                  <h3>Walls</h3>
                  <p>{this.toTitleCase(this.props.propData.building.construction.wallType)}</p>
                </li>
              </ul>
            </section>
            <section className="two-col">
              <h2>Details</h2>
              <ul className="detail-col-container">
                <li>
                  <h3>Rooms</h3>
                  <p>Full Baths: <span>{this.props.propData.building.rooms.bathsfull}</span></p>
                  <p>Half Baths: <span>{this.props.propData.building.rooms.bathshalf}</span></p>
                  <p>Bedrooms: <span>{this.props.propData.building.rooms.beds}</span></p>
                </li>
                <li>
                  <h3>Building Sizes</h3>
                  <p>Building: <span>{this.toCommaNumber(this.props.propData.building.size.bldgsize)} sqft</span></p>
                  <p>Ground Floor: <span>{this.toCommaNumber(this.props.propData.building.size.groundfloorsize)} sqft</span></p>
                  <p>Living Size: <span>{this.toCommaNumber(this.props.propData.building.size.livingsize)} sqft</span></p>
                </li>
                <li>
                  <h3>Area</h3>
                  <p>Block Number: <span>{this.props.propData.area.blockNum}</span></p>
                  <p>County: <span>{this.toTitleCase(this.props.propData.area.countrysecsubd)}</span></p>
                  <p>Sub Division: <span>{this.toTitleCase(this.props.propData.area.subdname)}</span></p>
                  <p>Tax Code Area: <span>{this.props.propData.area.taxcodearea}</span></p>
                </li>              
              </ul>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

export default Propfeature;
