import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchHere.css'
const convert = require('xml-js');

class SearchHere extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

    this.getLocationData = this.getLocationData.bind(this)    
    this.fetchAPIData = this.fetchAPIData.bind(this)
  }

  render() {
    return (
      <div>
        <button className="search-user-location-button" onClick={this.getLocationData}>{this.props.btnName}
          <span>{this.props.btnText}</span>
          <img alt="" src={require('../images/propview-location-icon.png')}/>
        </button>
      </div>
    );
  }

  getLocationData(e) {
    e.preventDefault()
    this.props.getData({loading: 'START'})
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
      this.props.getData({loading: 'STOP'})
      return false
    }
  }

  fetchAPIData(latlong) {
    // Keep track of which calls have finished
    let finishedAPIs = {
      onProperty: false,
      onSale: false,
      onSchools: false,
      onAVM: false,
      zillSearch: false,
      zillProperty: false
    }
    // Object to hold objects for merging
    let apiObjects = {
      onProperty: {},
      onSale: {},
      onSchools: {},
      onAVM: {},
      zillSearch: {},
      zillProperty: {}
    }

    // Variable to store method for passing the gathered data
    let sendData = () => {
      let propData
      for (let status in finishedAPIs) {
        if (finishedAPIs[status] === false) {
          return
        }
      }

      // Merge API data in order
      propData = Object.assign({}, apiObjects.onProperty, apiObjects.onSchools, apiObjects.onAVM, apiObjects.onSale, apiObjects.zillSearch, apiObjects.zillProperty)

      // End Loading indicator
      this.props.getData({loading: 'STOP'})

      //Check if anything was returned
      if (Object.keys(propData).length !== 0) {
        this.props.getData(propData)
      }
    }

    // CONFIGURATIONS
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
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
        Accept: 'application/json',
      }
    }
    let confSaleHistory = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/saleshistory/detail',
      headers: {
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
        Accept: 'application/json',
      }
    }
    let confAVM = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/avm/snapshot',
      headers: {
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
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
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
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

    // OnBoard Property & School Data
    axios(confProperty)
    .then(dataOnProperty => {
      let propAddress = []
      finishedAPIs.onProperty = true
      apiObjects.onProperty = dataOnProperty.data.property[0]
      
      propAddress.push(dataOnProperty.data.property[0].address.line1)
      propAddress.push(dataOnProperty.data.property[0].address.line2)      
      
      axios(Object.assign(confZillowSearch, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', address: propAddress[0], citystatezip: propAddress[1]}}))
      .then(dataZillSearch => {
        finishedAPIs.zillSearch = true
        dataZillSearch = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})["SearchResults:searchresults"].response.results.result
        apiObjects.zillSearch = dataZillSearch
        dataZillSearch = dataZillSearch.zpid._text        
        
        axios(Object.assign(confZillowProperty, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', zpid: dataZillSearch}}))
        .then(dataZillProperty => {
          finishedAPIs.zillProperty = true
          dataZillProperty = convert.xml2js(dataZillProperty.data, {compact: true, spaces: 2})['UpdatedPropertyDetails:updatedPropertyDetails'].response
          apiObjects.zillProperty = dataZillProperty

          sendData()          
        })
        .catch(err => {
          finishedAPIs.zillProperty = true

          sendData()
        })
      })
      .catch(err => {
        finishedAPIs.zillSearch = true
        finishedAPIs.zillProperty = true

        sendData()      
      })

      axios(confSchool)
      .then(dataOnSchools => {
        finishedAPIs.onSchools = true
        apiObjects.onSchools = dataOnSchools.data

        sendData()        
      })            
      .catch(err => {
        finishedAPIs.onSchools = true

        sendData()
      })

      axios(Object.assign(confSaleHistory, {params: {address1: propAddress[0], address2: propAddress[1]}}))
      .then(dataOnSalesHistory => {
        finishedAPIs.onSale = true
        apiObjects.onSale = dataOnSalesHistory.data.property[0]
        
        sendData()        
      })
      .catch(err => {
        finishedAPIs.onSale = true

        sendData()
      })

      axios(Object.assign(confAVM, {params: {address1: propAddress[0], address2: propAddress[1]}}))
      .then(dataOnAVM => {
        finishedAPIs.onAVM = true
        apiObjects.onAVM = dataOnAVM.data.property[0]

        sendData()
      })
      .catch(err => {
        finishedAPIs.onAVM = true

        sendData()
      })      
    })
    .catch(err => {
      finishedAPIs = {
        onProperty: true,
        onSale: true,
        onSchools: true,
        onAVM: true,
        zillSearch: true,
        zillProperty: true
      }

      sendData()
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
