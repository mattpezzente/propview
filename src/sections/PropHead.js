import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/PropHead.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

class PropHead extends Component {
  constructor(props) {
    super(props);
    this.props = {
      address1: '',
      address2: '',
      beds: '',
      baths: 0,
      sqft: 0,
    }

    // this.props.propData.address.line1
    // this.props.propData.address.line2
    // this.props.propData.building.rooms.beds
    // this.props.propData.building.rooms.bathstotal
    // this.props.propData.building.size.bldgsize

    this.getData = this.getData.bind(this)
  }

  render() {
    return (
      <section className="prophead-masthead">
        <Link to="/"><img className="prophead-logo" src={require('../images/propview-logo.png')} alt="PropView Logo"/></Link>  
        <section className="prophead-search-container">
          <SearchHere />
          <SearchBar getData={this.getData} />
        </section>
        <section className="prophead-info-container">
          <h3>{this.props.address1}</h3>
          <h3>{this.props.address2}</h3>            
          <ul className="prophead-info-details">
            <li>
              <span className="icon-bedrooms"></span>
              <p>{this.props.beds} Beds</p>            
            </li>
            <li>
              <span className="prophead-info-dot-spacing">•</span>
            </li>
            <li>
              <span className="icon-baths"></span>
              <p>{this.props.baths} Baths</p>
            </li>
            <li>
              <span className="prophead-info-dot-spacing">•</span>
            </li>
            <li>
              <span className="icon-sqrft"></span>     
              <p>{this.props.sqft} Squarefeet</p>
            </li>
          </ul>
        </section>
      </section>
    );
  }

  getData(data) {
    this.props.getData(data)
  }
}

export default PropHead;
