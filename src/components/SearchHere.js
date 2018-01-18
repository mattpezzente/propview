import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchHere.css'

class SearchHere extends Component {
  constructor(props) {
    super(props);

    this.getLocationData = this.getLocationData.bind(this)    
    this.fetchCurrentLocation = this.fetchCurrentLocation.bind(this)
  }

  render() {
    return (
      <button className="search-user-location-button" onClick={this.getLocationData}>{this.props.btnName}
        <span>{this.props.btnText}</span>
        <img alt="" src={require('../images/propview-location-icon.png')}/>
      </button>
    );
  }

  getLocationData(e) {
    e.preventDefault()    
    if (navigator.geolocation) {
      let latlong = []    
      navigator.geolocation.getCurrentPosition(position => {
        latlong.push(position.coords.latitude)
        latlong.push(position.coords.longitude)
        this.fetchCurrentLocation(latlong)    
      })
      return latlong
    } 
    else {
      console.log('fired3')
      return false
    }
  }

  fetchCurrentLocation(latlong) {   
    let loadFetchedData = (propData) => {
      this.props.getData(propData)
    }
    this.fetchOnboardAPI(latlong)  
  }

  fetchOnboardAPI(latlong) {
    let confProperty = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/property/snapshot',
      params: {
        latitude: latlong[0],
        longitude: latlong[1],
        radius: 0.15,
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
      params: {
        address1: '--------',
        address2: '--------',
      },
      headers: {
        apikey: '7bb280bbda2599b8a476c3ad8c884922',
        Accept: 'application/json',
      }
    }        
    let confATM = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/avm/detail',
      params: {
        address1: '--------',
        address2: '--------',
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

    axios(confProperty)
    .then(dataProperty => {
      console.log(dataProperty)  
    })
  }

  fetchZillowAPI() {
    let zillowPropData
    let zillowPropID
  
    let confZillowGetID = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetSearchResults.htm',
      params: {
        'zws-id': 'X1-ZWz18t8vbiroy3_3s95g',
        address: '127 maple ave',
        citystatezip: 'old saybrook ct',
      }
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

export default SearchHere;
