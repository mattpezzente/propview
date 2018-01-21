import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'
const convert = require('xml-js');

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    }

    this.fetchGivenAddress = this.fetchGivenAddress.bind(this)
    this.formatAddress = this.formatAddress.bind(this)
  }

  render() {
    return (
      <div>        
        <form action="#" method="">
          <input className="search-address" type="text" data-address placeholder="14807 Faversham Cir # 1, Orlando, FL 32826"/>
          <button onClick={this.fetchGivenAddress} className="search-address-button"><img alt="search button for entered address" src={require('../images/propview-search-icon.png')}/></button>
        </form>
      </div>
    );
  }

  fetchGivenAddress(e) {
    e.preventDefault()
    // Start the loading overlay
    this.props.getData({loading: 'START'})
    // Get formated input field value
    let address = this.formatAddress(document.querySelector('.search-address').value)
    // Keep track of which calls have finished
    let finishedAPIs = {
      onSale: false,
      onSchools: false,
      onAVM: false,
      zillSearch: false,
      zillProperty: false
    }
    // Object to hold objects for merging
    let apiObjects = {
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

      propData = Object.assign({}, apiObjects.onProperty, apiObjects.onSchools, apiObjects.onAVM, apiObjects.onSale, apiObjects.zillSearch, apiObjects.zillProperty)

      this.props.getData({loading: 'STOP'})

      //Check if anything was returned
      if (Object.keys(propData).length !== 0) {
        this.props.getData(propData)
      }
    }

    // CONFIGURATIONS
    let confSaleHistory = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/saleshistory/detail',
      params: {
        address1: address[0],
        address2: address[1],
      },
      headers: {
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
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
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
        Accept: 'application/json',
      }
    }
    let confSchool = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
      headers: {
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
        Accept: 'application/json',
      }
    }
    let confZillowSearch = {
      method: 'get',
      params: {
        'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', 
        address: address[0], 
        citystatezip: address[1],
      },
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetSearchResults.htm',
    }
    let confZillowProperty = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm',
    }
    
    // OnBoard Property Sales History & School Data
    axios(confSaleHistory)
    .then(dataOnSalesHistory => {
      let propLongLat = []
      finishedAPIs.onSale = true         
      propLongLat.push(dataOnSalesHistory.data.property[0].location.latitude)
      propLongLat.push(dataOnSalesHistory.data.property[0].location.longitude)
      apiObjects.onSale =  dataOnSalesHistory.data.property[0]

      axios(Object.assign(confSchool, {params: {latitude: propLongLat[0], longitude: propLongLat[1], radius: 15,}}))
      .then(dataOnSchools => {
        finishedAPIs.onSchools = true
        apiObjects.onSchools = dataOnSchools.data
        
        sendData()
      })
      .catch(err => {
        finishedAPIs.onSchools = true
        sendData()
      })
    })
    .catch(err => {
      finishedAPIs.onSale = true
      finishedAPIs.onSchools = true
      sendData()
    })

    // OnBoard Property Value Call
    axios(confAVM)
    .then(dataOnAVM => {
      finishedAPIs.onAVM = true
      apiObjects.onAVM = dataOnAVM.data.property[0]
      
      sendData()
    })
    .catch(err => {
      finishedAPIs.onAVM = true
      sendData()
    })

    // Zillow Property Calls
    axios(confZillowSearch)
    .then(dataZillSearch => {
      finishedAPIs.zillSearch = true
      dataZillSearch = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})["SearchResults:searchresults"].response.results.result
      apiObjects.zillSearch = dataZillSearch
      dataZillSearch = dataZillSearch.zpid._text
                  
      axios(Object.assign(confZillowProperty, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', zpid: dataZillSearch}}))
      .then(dataZillProperty => {
        finishedAPIs.zillProperty = true
        apiObjects.zillProperty = convert.xml2js(dataZillProperty.data, {compact: true, spaces: 2})['UpdatedPropertyDetails:updatedPropertyDetails'].response    

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

export default SearchBar;
