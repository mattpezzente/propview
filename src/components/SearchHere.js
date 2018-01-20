import React, { Component } from 'react';
import Loading from './Loading';
import axios from 'axios';
import '../styles/css/SearchHere.css'
const convert = require('xml-js');

class SearchHere extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }

    this.getLocationData = this.getLocationData.bind(this)    
    this.fetchAPIData = this.fetchAPIData.bind(this)
  }

  render() {
    return (
      <div>
        <Loading loading={this.state.loading} />
        <button className="search-user-location-button" onClick={this.getLocationData}>{this.props.btnName}
          <span>{this.props.btnText}</span>
          <img alt="" src={require('../images/propview-location-icon.png')}/>
        </button>
      </div>
    );
  }

  getLocationData(e) {
    e.preventDefault()
    this.setState({loading: true})
    if (navigator.geolocation) {
      let latlong = []    
      navigator.geolocation.getCurrentPosition(position => {
        latlong.push(position.coords.latitude)
        latlong.push(position.coords.longitude)
        this.fetchAPIData(latlong)    
      }, err => {}, {enableHighAccuracy: true})
      return latlong
    } 
    else {
      this.setState({loading: false})
      return false
    }
  }

  fetchAPIData(latlong) {
    let stopLoading = () => {
      this.setState({loading: false})
    }
    let loadFetchedData = propData => {      
      stopLoading()
      this.props.getData(propData)      
    }
    let confProperty = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/property/snapshot',
      params: {
        latitude: latlong[0],
        longitude: latlong[1],
        radius: 0.25,
        orderby: 'distance',
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confSaleHistory = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/saleshistory/detail',
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confAVM = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/avm/snapshot',
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }
    let confSchool = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
      params: {
        latitude: latlong[0],
        longitude: latlong[1],
      },
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
      let propAddress = []
      propAddress.push(dataOnProperty.data.property[0].address.line1)
      propAddress.push(dataOnProperty.data.property[0].address.line2)
      axios(Object.assign(confSaleHistory, {params: {address1: propAddress[0], address2: propAddress[1]}}))
      .then(dataOnSalesHistory => {
        axios(Object.assign(confAVM, {params: {address1: propAddress[0], address2: propAddress[1]}}))
        .then(dataOnAVM => {
          axios(confSchool)
          .then(dataOnSchools => {
            axios(Object.assign(confZillowSearch, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', address: propAddress[0], citystatezip: propAddress[1]}}))
            .then(dataZillSearch => {
              dataZillSearch = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})["SearchResults:searchresults"].response.results.result.zpid._text
              axios(Object.assign(confZillowProperty, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', zpid: dataZillSearch}}))
              .then(dataZillProperty => {
                dataZillProperty = convert.xml2js(dataZillProperty.data, {compact: true, spaces: 2})['UpdatedPropertyDetails:updatedPropertyDetails'].response
                
                // console.log('OnProperty')
                // console.log(dataOnProperty.data.property[0])
                // console.log('OnSalesHistory')
                // console.log(dataOnSalesHistory.data.property[0])
                // console.log('OnAVM')
                // console.log(dataOnAVM.data.property[0])
                // console.log('OnSchools')
                // console.log(dataOnSchools.data)
                // console.log('ZillowProperty')
                // console.log(dataZillProperty)

                loadFetchedData(Object.assign(dataOnSchools.data, dataOnAVM.data.property[0], dataOnProperty.data.property[0], dataZillProperty, dataOnSalesHistory.data.property[0]))
              })              
            })
          })
        })
      })      
    })
    .catch(err => {
      stopLoading()
    })
  }

  formatAddress(str) {
    if (str.split(',').length < 2) {
      return false
    }
    else {    
      let addressArray = [
        str.substring(0, str.indexOf(',')),
        str.slice(str.indexOf(',')+1).trim(),
      ]
      return addressArray
    }
  }
}

export default SearchHere;
