import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/PropHead.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

class PropHead extends Component {
  constructor(props) {
    super(props);
    props = {
      address1: '',
      address2: '',
      beds: '',
      baths: 0,
      sqft: 0,
    }

    this.getData = this.getData.bind(this)
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
      let baths
      if (this.props.propData.building.rooms.bathshalf % 2 !== 0) {
        baths = this.props.propData.building.rooms.bathstotal - 0.5
      } 
      else {
        baths = this.props.propData.building.rooms.bathstotal
      }
      this.props = {
        address1: this.props.propData.address.line1,
        address2: this.props.propData.address.line2,
        beds: this.props.propData.building.rooms.beds,
        baths: baths,
        sqft: this.toCommaNumber(this.props.propData.building.size.livingsize),
      }
    }
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
