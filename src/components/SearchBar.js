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
    let loadFetchedData = propData => {
      console.log(propData)
      this.props.getData(propData)
    }
    let confProperty = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail',
      params: {
        address1: address[0],
        address2: address[1],
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confSaleHistory = {
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
    let confAVM = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/avm/snapshot',
      params: {
        address1: address[0],
        address2: address[1],
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confSchool = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confZillowSearch = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetSearchResults.htm',
    }
    let confZillowProperty = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm',
    }

    axios(confProperty)
    .then(dataOnProperty => {      
      let propLongLat = []
      let propZillowID
      propLongLat.push(dataOnProperty.data.property[0].location.latitude)
      propLongLat.push(dataOnProperty.data.property[0].location.longitude)
      axios(confSaleHistory)
       .then(dataOnSalesHistory => {
         axios(confAVM)
         .then(dataOnAVM => {
           axios(Object.assign(confSchool, {params: {latitude: propLongLat[0], longitude: propLongLat[1], radius: 15,}}))
           .then(dataOnSchools => {
             axios(Object.assign(confZillowSearch, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', address: dataOnAVM.data.property[0].address.line1, citystatezip: dataOnAVM.data.property[0].address.line2}}))
             .then(dataZillSearch => {               
                propZillowID = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})
                if (propZillowID["SearchResults:searchresults"].response.results.result[0]) {
                  propZillowID = propZillowID["SearchResults:searchresults"].response.results.result[0].zpid._text
                }
                else {
                  propZillowID = propZillowID["SearchResults:searchresults"].response.results.result.zpid._text
                }
                axios(Object.assign(confZillowProperty, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', zpid: dataZillSearch}}))
                .then(dataZillProperty => {
                  dataZillProperty = convert.xml2js(dataZillProperty.data, {compact: true, spaces: 2})['UpdatedPropertyDetails:updatedPropertyDetails'].response
                
                console.log('OnProperty')
                console.log(dataOnProperty.data.property[0])
                console.log('OnSalesHistory')
                console.log(dataOnSalesHistory.data.property[0])
                console.log('OnAVM')
                console.log(dataOnAVM.data.property[0])
                console.log('OnSchools')
                console.log(dataOnSchools.data)
                console.log('ZillowProperty')
                console.log(dataZillProperty)

                  //loadFetchedData(Object.assign(dataOnSchools.data, dataOnAVM.data.property[0], dataOnProperty.data.property[0], dataZillProperty, dataOnSalesHistory.data.property[0]))
              })              
            })
          })
        })
      })      
    })
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
