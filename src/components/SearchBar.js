import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'
const convert = require('xml-js');

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
      this.props.getData(propData)
    }
    let zillowPropData
    let zillowPropID

    let configSchools = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let configATM = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/avm/detail',
      params: {
        address1: address[0],
        address2: address[1],
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let configSaleHistory = {
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
    let confZillowGetID = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetSearchResults.htm',
      params: {
        'zws-id': 'X1-ZWz18t8vbiroy3_3s95g',
        address: '127 maple ave',
        citystatezip: 'old saybrook ct',
      }
    }
    if (address) {      
      axios(configSaleHistory)
      .then(dataSale => { 
        axios(configATM)
        .then(dataATM => {           
          let tempConfig = Object.assign(
            configSchools, {
              params: {
                latitude: dataATM.data.property[0].location.latitude,
                longitude: dataATM.data.property[0].location.longitude,
                radius: 10
              }
            })
          axios(tempConfig)
          .then(dataSchool => {            
            axios(confZillowGetID)
            .then(dataZillowID => {
              zillowPropID = convert.xml2js(dataZillowID.data, {compact: true, spaces: 2})["SearchResults:searchresults"].response.results.result.zpid._text
            })
            .then(() => {
              let confZillowDetails = {
                method: 'get',
                url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm',
                params: {
                  'zws-id': 'X1-ZWz18t8vbiroy3_3s95g',
                  zpid: zillowPropID,
                }
              }
              axios(confZillowDetails)
              .then(dataZillowProp => {
                zillowPropData = convert.xml2js(dataZillowProp.data, {compact: true, spaces: 2})['UpdatedPropertyDetails:updatedPropertyDetails'].response.homeDescription
              })
              .then(() => {
                loadFetchedData(Object.assign(dataSale.data.property[0], dataATM.data.property[0], dataSchool.data, zillowPropData))
              })
            })
          })
        })
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
