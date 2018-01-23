import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import imgBackground from '../images/propview-property-1.png';
import '../styles/css/PropHead.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

class PropHead extends Component {
  constructor(props) {
    super(props);
    this.localProps = {
      address1: 'UNKNOWN',
      address2: 'UNKNOWN',
      backImg: imgBackground,
      beds: 'N/A',
      baths: 'N/A',
      sqft: 'N/A',
    }

    this.getData = this.getData.bind(this)
  }

  render() {    
      this.localProps = {
        address1: address1,
        address2: address2,
        backImg: backImg,
        beds: beds,
        baths: baths,
        sqft: this.toCommaNumber(sqft),
      }
    }
    return (
      <section style={{backgroundImage: 'url('+this.localProps.backImg+')'}} className="prophead-masthead-container">
        <div className="prophead-masthead-wrapper">
          <Link to={process.env.PUBLIC_URL+'/'}><img className="prophead-logo" src={require('../images/propview-logo.png')} alt="PropView Logo"/></Link>  
          <section className="prophead-search-container">
            <SearchHere getData={this.getData} />
            <SearchBar getData={this.getData} />
          </section>
          <section className="prophead-info-container">
            <h3>{this.localProps.address1}</h3>
            <h3>{this.localProps.address2}</h3>            
            <ul className="prophead-info-details">
              <li>
                <span className="icon-bedrooms"></span>
                <p>{this.localProps.beds} Beds</p>            
              </li>
              <li>
                <span className="prophead-info-dot-spacing">•</span>
              </li>
              <li>
                <span className="icon-baths"></span>
                <p>{this.localProps.baths} Baths</p>
              </li>
              <li>
                <span className="prophead-info-dot-spacing">•</span>
              </li>
              <li>
                <span className="icon-sqrft"></span>     
                <p>{this.localProps.sqft} Squarefeet</p>
              </li>
            </ul>
          </section>
        </div>
      </section>
    );
  }

  getData(data) {
    this.props.getData(data)
  }


  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default PropHead;
