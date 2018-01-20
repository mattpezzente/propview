import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';
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
        <Loading loading={this.state.loading} />
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
    this.setState({loading:true})
    // Keep store which calls were successful
    let finishedAPIs = {
      onSale: false,
      onSchools: false,
      onAVM: false,
      zillSearch: false,
      zillProperty: false
    }
    // Hold on to the gathered OnBoard data
    let fetchedData = {}
    // Get the formatted address from the input field
    let address = this.formatAddress(document.querySelector('input[data-address]').value)
    // Variable to store method for removing the overlay 
    let stopLoading = () => {
      this.setState({loading: false})
    }
    // Variable to store method for passing the gathered data
    let sendData = propData => {
      for (let status in finishedAPIs) {
        if (finishedAPIs[status] == false) {
          return
        }
      }
      stopLoading()
      console.log(propData)
      this.props.getData(propData)      
    }
    

    // CONFIGURATIONS
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
      finishedAPIs.onSale = true
      let propLongLat = []      
      propLongLat.push(dataOnSalesHistory.data.property[0].location.latitude)
      propLongLat.push(dataOnSalesHistory.data.property[0].location.longitude)      
      axios(Object.assign(confSchool, {params: {latitude: propLongLat[0], longitude: propLongLat[1], radius: 15,}}))
      .then(dataOnSchools => {
        finishedAPIs.onSchools = true
        fetchedData = Object.assign(fetchedData, dataOnSchools.data, dataOnSalesHistory.data.property[0])
        
        console.log('On Schools')
        sendData(fetchedData)
      })
      .catch(err => {
        finishedAPIs.onSchools = true
        sendData(fetchedData)
      })
    })
    .catch(err => {
      finishedAPIs.onSale = true
      finishedAPIs.onSchools = true
      sendData(fetchedData)
    })

    // OnBoard Property Value Call
    axios(confAVM)
    .then(dataOnAVM => {
      finishedAPIs.onAVM = true
      fetchedData = Object.assign(fetchedData, dataOnAVM.data.property[0])
      
      console.log('OnBoard AVM')
      sendData(fetchedData)
    })
    .catch(err => {
      finishedAPIs.push('onAVM')
      sendData(fetchedData)
    })

    // Zillow Property Calls
    axios(confZillowSearch)
    .then(dataZillSearch => {
      finishedAPIs.zillSearch = true
      let propZillowDetails
      let propZillowID = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})                       
      if (propZillowID["SearchResults:searchresults"].response.results.result[0]) {
        propZillowID = propZillowID["SearchResults:searchresults"].response.results.result[0].zpid._text
      }
      else {
        propZillowID = propZillowID["SearchResults:searchresults"].response.results.result.zpid._text
      }
      axios(Object.assign(confZillowProperty, {params: {'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', zpid: propZillowID}}))
      .then(dataZillProperty => {
        finishedAPIs.zillProperty = true
        propZillowDetails = convert.xml2js(dataZillProperty.data, {compact: true, spaces: 2})
        propZillowDetails = propZillowDetails['UpdatedPropertyDetails:updatedPropertyDetails'].response
        fetchedData = Object.assign(fetchedData, propZillowDetails)
        
        console.log('Zillow Property')
        sendData(fetchedData)
      })
      .catch(err => {
        finishedAPIs.zillProperty = true
        sendData(fetchedData)
      })
    })
    .catch(err => {
      finishedAPIs.zillSearch = true
      finishedAPIs.zillProperty = true
      sendData(fetchedData)    
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
