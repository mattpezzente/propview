import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.fetchGivenAddress = this.fetchGivenAddress.bind(this)
    this.formatAddress = this.formatAddress.bind(this)
  }

  render() {
    return (
      <form action="#" method="">
        <input className="search-address" type="text" data-address placeholder="14807 Faversham Cir # 1, Orlando, FL 32826"/>
        <button onClick={this.fetchGivenAddress} className="search-address-button"><img alt="search button for entered address" src={require('../images/propview-search-icon.png')}/></button>
      </form>
    );
  }

  fetchGivenAddress(e) {
    e.preventDefault()
    let address = this.formatAddress(document.querySelector('input[data-address]').value)
    let loadFetchedData = (propData) => {
      console.log('SearchBar.js Data')
      this.props.getData(propData)      
    }
    let config = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/saleshistory/detail',
      params: {
        address1: address[0],
        address2: address[1],
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    if (address) {      
      axios(config)
      .then(data => { 
        loadFetchedData(data.data.property[0]);
      })
    }
    else {
      console.log('Error, invalid address')
    }
  }

  formatAddress(str) {
    if (str.split(',').length < 2) {
      return false
    }
    else {
      let addressArray = [
        str.split(',')[0],
        str.substring(str.indexOf(',')),
      ]
      return addressArray
    }
  }
}

export default SearchBar;
