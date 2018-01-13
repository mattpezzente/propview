import React, { Component } from 'react';
import '../styles/css/SearchHere.css'

class SearchHere extends Component {
  constructor(props) {
    super(props);

    this.fetchUserLocation = this.fetchUserLocation.bind(this)
  }

  render() {
    return (
      <button className="search-user-location-button" onClick={this.fetchUserLocation}>{this.props.btnName}
        <span>{this.props.btnText}</span>
        <img alt="" src={require('../images/propview-location-icon.png')}/>
      </button>
    );
  }

  fetchUserLocation(e) {
    e.preventDefault()
    alert('SearchHere Working')
  }
}

export default SearchHere;
