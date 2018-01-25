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

class PropDetail extends Component {
  constructor(props) {
    super(props);

    this.localProps = {
      yearBuilt: 'N/A',
      pool: 'N/A',
      bldgType: 'N/A',
      lotSize: 'N/A',
      cooling: 'N/A',
      roof: 'N/A',
      heating: 'N/A',
      walls: 'N/A',

      bathsFull: 'N/A',
      bathsHalf: 'N/A',
      beds: 'N/A',
      bldgSize: 'N/A',
      groundFloorSize: 'N/A',
      livingSize: 'N/A',
      blockNum: 'N/A',
      countrySecSubd: 'N/A',
      subdName: 'N/A',
      taxCodeArea: 'N/A',
    } 
  }

  componentWillUpdate() {
    // Check if there is data in the props
    if (Object.keys(this.props.propData).length !== 0) {  
      this.localProps = {
        yearBuilt: this.props.propData.yearBuilt,
        pool: this.props.propData.pool,
        bldgType: this.props.propData.bldgType,
        lotSize: this.props.propData.lotSize,
        cooling: this.props.propData.cooling,
        roof: this.props.propData.roof,
        heating: this.props.propData.heating,
        walls: this.props.propData.walls,
        bathsFull: this.props.propData.bathsFull,
        bathsHalf: this.props.propData.bathsHalf,
        beds: this.props.propData.beds,
        bldgSize: this.props.propData.bldgSize,
        groundFloorSize: this.props.propData.groundFloorSize,
        livingSize: this.props.propData.livingSize,
        blockNum: this.props.propData.blockNum,
        countrySecSubd: this.props.propData.countrySecSubd,
        subdName: this.props.propData.subdName,
        taxCodeArea: this.props.propData.taxCodeArea,
      }
    }  
  }
  
  render() {  
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
                  <p>{this.localProps.yearBuilt}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoPool} alt="year built icon"/>
                  </div>
                  <h3>Pool</h3>
                  <p>{this.localProps.pool}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoType} alt="year built icon"/>
                  </div>
                  <h3>Building Type</h3>
                  <p>{this.localProps.bldgType}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoLot} alt="year built icon"/>
                  </div>
                  <h3>Lot</h3>
                  <p>{this.localProps.lotSize}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoCooling} alt="year built icon" />
                  </div>
                  <h3>Cooling</h3>
                  <p>{this.localProps.cooling}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoRoof} alt="year built icon"/>
                  </div>
                  <h3>Roof</h3>
                  <p>{this.localProps.roof}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoHeating} alt="year built icon" />
                  </div>
                  <h3>Heating</h3>
                  <p>{this.localProps.heating}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoWall} alt="year built icon"/>
                  </div>
                  <h3>Walls</h3>
                  <p>{this.localProps.walls}</p>
                </li>
              </ul>
            </section>
            <section className="two-col">
              <h2>Details</h2>
              <ul className="detail-col-container">
                <li>
                  <h3>Rooms</h3>
                  <p>Full Baths: <span>{this.localProps.bathsFull}</span></p>
                  <p>Half Baths: <span>{this.localProps.bathsHalf}</span></p>
                  <p>Bedrooms: <span>{this.localProps.beds}</span></p>
                </li>
                <li>
                  <h3>Building Sizes</h3>
                  <p>Building: <span>{this.localProps.bldgSize}</span></p>
                  <p>Ground Floor: <span>{this.localProps.groundFloorSize}</span></p>
                  <p>Living Size: <span>{this.localProps.livingSize}</span></p>
                </li>
                <li>
                  <h3>Area</h3>
                  <p>Block Number: <span>{this.localProps.blockNum}</span></p>
                  <p>County: <span>{this.localProps.countrySecSubd}</span></p>
                  <p>Sub Division: <span>{this.localProps.subdName}</span></p>
                  <p>Tax Code Area: <span>{this.localProps.taxCodeArea}</span></p>
                </li>              
              </ul>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

export default PropDetail;
