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
    
    // this.props.propData.building.summary.yearbuilteffective
    // this.props.propData.lot.poolind = "Y" ? 'Yes' : 'No'
    // this.toTitleCase(this.props.propData.building.summary.bldgType)
    // this.toCommaNumber(this.props.propData.lot.lotsize2)
    // this.toTitleCase(this.props.propData.utilities.coolingtype)
    // this.toTitleCase(this.props.propData.building.construction.roofcover)
    // this.toTitleCase(this.props.propData.utilities.heatingtype)
    // this.toTitleCase(this.props.propData.building.construction.wallType)

    // this.props.propData.building.rooms.bathsfull
    // this.props.propData.building.rooms.bathshalf
    // this.props.propData.building.rooms.beds
    // this.toCommaNumber(this.props.propData.building.size.bldgsize)
    // this.toCommaNumber(this.props.propData.building.size.groundfloorsize)
    // this.toCommaNumber(this.props.propData.building.size.livingsize)
    // this.props.propData.area.blockNum
    // this.toTitleCase(this.props.propData.area.countrysecsubd)
    // this.toTitleCase(this.props.propData.area.subdname)
    // this.props.propData.area.taxcodearea


    this.toTitleCase = this.toTitleCase.bind(this)
    this.toCommaNumber = this.toCommaNumber.bind(this) 
  }
  
  render() {    
      this.localProps = {
        yearBuilt: yearBuilt,
        pool: pool,
        bldgType: bldgType,
        lotSize: lotSize,
        cooling: cooling,
        roof: roof,
        heating: heating,
        walls: walls,

        bathsFull: bathsFull,
        bathsHalf: bathsHalf,
        beds: beds,
        bldgSize: bldgSize,
        groundFloorSize: groundFloorSize,
        livingSize: livingSize,
        blockNum: blockNum,
        countrySecSubd: countrySecSubd,
        subdName: subdName,
        taxCodeArea: taxCodeArea,
      }
    }
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

  toTitleCase(str) {
    if (str !== undefined) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    else {
      return 'N/A'
    }
  }

  toCommaNumber(num) {
    if (num !== undefined) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    else {
      return 'N/A'
    }
  }
}

export default PropDetail;
