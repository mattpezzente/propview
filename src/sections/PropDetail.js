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
    if (Object.keys(this.props.propData).length !== 0) {
      let p = this.props.propData
      let yearBuilt = ''
      let pool = ''
      let bldgType = ''
      let lotSize = ''
      let cooling = ''
      let roof = ''
      let heating = ''
      let walls = ''

      let bathsFull = ''
      let bathsHalf = ''
      let beds = ''
      let bldgSize = ''
      let groundFloorSize = ''
      let livingSize = ''
      let blockNum = ''
      let countrySecSubd = ''
      let subdName = ''
      let taxCodeArea = ''

      try {
        // Year Built
        if (p.building.summary.yearbuilteffective) {
          yearBuilt = p.building.summary.yearbuilteffective
        }
        else if (p.summary.yearbuilteffective) {
          yearBuilt = p.summary.yearbuilteffective
        }
        else {
          yearBuilt = 'N/A'
        }

        // Pool
        if (true) {
          pool = 'Yes'
        }
        else {
          pool = 'No'
        }

        // Building Type
        if (p.building.summary.bldgType) {
          bldgType = p.building.summary.bldgType
        }
        else {
          bldgType = 'N/A'
        }

        // Lot Size
        if (p.lot.lotsize1) {
          lotSize = p.lot.lotsize1 + 'sqft'
        }
        else if (p.lot.lotsize2) {
          lotSize = p.lot.lotsize2 + 'sqft'
        }
        else {
          lotSize = 'N/A'
        }

        // Cooling Type
        if (p.utilities.coolingtype) {
          cooling = p.utilities.coolingtype
        }
        else {
          cooling = 'N/A'
        }

        // Roofing
        if (p.building.construction.roofcover) {
          roof = p.building.construction.roofcover
        }
        else {
          roof = 'N/A'
        }

        // Heating Type
        if (p.utilities.heatingtype) {
          heating = p.utilities.heatingtype
        }
        else {
          heating = 'N/A'
        }

        // Wall Type
        if (p.utilities.wallType) {
          walls = p.utilities.wallType
        }
        else {
          walls = 'N/A'
        }

        // Full Baths
        if (p.building.rooms.bathsfull > 0) {
          bathsFull = p.building.rooms.bathsfull
        }
        else if (p.building.rooms.bathscalc) {
          bathsFull = p.building.rooms.bathscalc
        }
        else {
          bathsFull = 'N/A'
        }

        // Half Baths
        if (p.building.rooms.bathshalf > 0) {
          bathsHalf = p.building.rooms.bathshalf
        }
        else {
          bathsHalf = 'N/A'
        }

        // Beds
        if (p.building.rooms.beds > 0) {
          beds = p.building.rooms.beds
        }
        else {
          beds = 'N/A'
        }

        // Building Size
        if (p.building.size.bldgSize) {
          bldgSize = p.building.size.bldgSize + 'sqft'
        }
        else {
          bldgSize = 'N/A'
        }

        // Ground Floor Size
        if (p.building.size.groundfloorsize) {
          groundFloorSize = p.building.size.groundfloorsize + 'sqft'
        }
        else {
          groundFloorSize = 'N/A'
        }

        // Living Floor Size
        if (p.building.size.livingsize) {
          livingSize = p.building.size.livingsize + 'sqft'
        }
        else {
          livingSize = 'N/A'
        }

        // Block Number
        if (p.area.blockNum) {
          blockNum = p.area.blockNum
        }
        else {
          blockNum = 'N/A'
        }

        // County Name
        if (p.area.countrysecsubd) {
          countrySecSubd = p.area.countrysecsubd
        }
        else {
          countrySecSubd = 'N/A'
        }

        // Subdivision Section
        if (p.area.subdname) {
          countrySecSubd = p.area.subdname
        }
        else {
          countrySecSubd = 'N/A'
        }

        // Tax Code Area
        if (p.area.taxcodearea) {
          taxCodeArea = p.area.taxcodearea
        }
        else {
          taxCodeArea = 'N/A'
        }
      } catch(err) {

      }
            
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
