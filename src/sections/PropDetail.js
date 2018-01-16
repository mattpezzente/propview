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

    props = {
      yearBuilt: 0,
      pool: '',
      bldgType: '',
      lotSize: 0,
      cooling: '',
      roof: '',
      heating: '',
      walls: '',

      bathsFull: 0,
      bathsHalf: 0,
      beds: 0,
      bldgSize: 0,
      groundFloorSize: 0,
      livingSize: 0,
      blockNum: 0,
      countrySecSubd: '',
      subdName: '',
      taxCodeArea: 0
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

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    if (this.props.propData) {
      let buildType
      let subdName
      if (this.props.propData.building.summary.bldgType) {
        buildType = this.toTitleCase(this.props.propData.building.summary.bldgType)
      }
      else {
        buildType = this.toTitleCase(this.props.propData.building.summary.archStyle)
      }

      if (this.props.propData.area.subdname) {
        subdName = this.toTitleCase(this.props.propData.area.subdname)
      }
      else {
        subdName = this.toTitleCase(this.props.propData.area.countrysecsubd)
      }
      this.props = {
        yearBuilt: this.props.propData.summary.yearbuilt,
        pool: this.props.propData.lot.poolind = "Y" ? 'Yes' : 'No',
        bldgType: buildType,
        lotSize: this.toCommaNumber(this.props.propData.lot.lotsize2),
        cooling: this.toTitleCase(this.props.propData.utilities.coolingtype),
        roof: this.toTitleCase(this.props.propData.building.construction.roofcover),
        heating: this.toTitleCase(this.props.propData.utilities.heatingtype),
        walls: this.toTitleCase(this.props.propData.building.construction.wallType),

        bathsFull: this.props.propData.building.rooms.bathsfull,
        bathsHalf: this.props.propData.building.rooms.bathshalf,
        beds: this.props.propData.building.rooms.beds,
        bldgSize: this.toCommaNumber(this.props.propData.building.size.bldgsize),
        groundFloorSize: this.toCommaNumber(this.props.propData.building.size.groundfloorsize),
        livingSize: this.toCommaNumber(this.props.propData.building.size.livingsize),
        blockNum: this.props.propData.area.blockNum,
        countrySecSubd: this.toTitleCase(this.props.propData.area.countrysecsubd),
        subdName: subdName,
        taxCodeArea: this.props.propData.area.taxcodearea,
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
                  <p>{this.props.yearBuilt}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoPool} alt="year built icon"/>
                  </div>
                  <h3>Pool</h3>
                  <p>{this.props.pool}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoType} alt="year built icon"/>
                  </div>
                  <h3>Building Type</h3>
                  <p>{this.props.bldgType}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoLot} alt="year built icon"/>
                  </div>
                  <h3>Lot</h3>
                  <p>{this.props.lotSize} sqft</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoCooling} alt="year built icon" />
                  </div>
                  <h3>Cooling</h3>
                  <p>{this.props.cooling}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoRoof} alt="year built icon"/>
                  </div>
                  <h3>Roof</h3>
                  <p>{this.props.roof}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoHeating} alt="year built icon" />
                  </div>
                  <h3>Heating</h3>
                  <p>{this.props.heating}</p>
                </li>
                <li className="two-col">
                  <div className="feature-img-container">
                    <img className="feature-img" src={icoWall} alt="year built icon"/>
                  </div>
                  <h3>Walls</h3>
                  <p>{this.props.walls}</p>
                </li>
              </ul>
            </section>
            <section className="two-col">
              <h2>Details</h2>
              <ul className="detail-col-container">
                <li>
                  <h3>Rooms</h3>
                  <p>Full Baths: <span>{this.props.bathsFull}</span></p>
                  <p>Half Baths: <span>{this.props.bathsHalf}</span></p>
                  <p>Bedrooms: <span>{this.props.beds}</span></p>
                </li>
                <li>
                  <h3>Building Sizes</h3>
                  <p>Building: <span>{this.props.bldgSize} sqft</span></p>
                  <p>Ground Floor: <span>{this.props.groundFloorSize} sqft</span></p>
                  <p>Living Size: <span>{this.props.livingSize} sqft</span></p>
                </li>
                <li>
                  <h3>Area</h3>
                  <p>Block Number: <span>{this.props.blockNum}</span></p>
                  <p>County: <span>{this.props.countrySecSubd}</span></p>
                  <p>Sub Division: <span>{this.props.subdName}</span></p>
                  <p>Tax Code Area: <span>{this.props.taxCodeArea}</span></p>
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
