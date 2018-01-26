import React, { Component } from 'react';
import imgBackground from '../images/propview-property-unavailable.png';
import '../styles/css/PropHead.css';
import SearchBar from '../components/SearchBar';
import SearchHere from '../components/SearchHere';

class PropHead extends Component {
  constructor(props) {
    super(props);
    // Local props object for fallbacks, and storage of incoming props
    this.localProps = {
      address1: '',
      address2: 'No Address',
      backImg: imgBackground,
      beds: 'N/A',
      baths: 'N/A',
      sqft: 'N/A',
    }


    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    // Make logo link to homepage directly
    document.querySelector('.prophead-logo').addEventListener('click', e => {
      window.location.assign(process.env.PUBLIC_URL+'/home')
    })
  }

  componentWillUnmount() {
    // Remove logo click event
    document.querySelector('.prophead-logo').removeEventListener('click')
  }

  render() {    
    // Check if there is data in the props
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps = {
        address1: this.props.propData.address1,
        address2: this.props.propData.address2,
        backImg: this.props.propData.backImg,
        beds: this.props.propData.beds,
        baths: this.props.propData.bathsTotal,
        sqft: this.props.propData.sqft
      }
      // If there is no background Image url, set the background image
      if (this.localProps.backImg.length < 3) {
        this.localProps.backImg = imgBackground
      }
    }
    return (
      <section style={{backgroundImage: 'url('+this.localProps.backImg+')'}} className="prophead-masthead-container">
        <div className="prophead-masthead-wrapper">
          <a><img className="prophead-logo" src={require('../images/propview-logo.png')} alt="PropView Logo"/></a>
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

  // Method to allow data to be passed through components
  getData(data) {
    this.props.getData(data)
  }
}

export default PropHead;
