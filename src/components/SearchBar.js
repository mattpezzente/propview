import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'
import PropertyDO from '../PropertyDO';
import defaultImg from '../images/propview-property-1.png';
const convert = require('xml-js');
const currencyFormatter = require('currency-formatter');


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

      // Merge API data in order
      propData = Object.assign({}, apiObjects.onProperty, apiObjects.onSchools, apiObjects.onAVM, apiObjects.onSale, apiObjects.zillSearch, apiObjects.zillProperty)
      
      // End Loading indicator
      this.props.getData({loading: 'STOP'})
      
      console.log('Pre-DO')
      console.log(propData)

      // Return the data with the PropertyDO format
      propData = this.formatDO(propData)      
      
      
      console.log('After-DO')
      console.log(propData)

      // Check if anything was returned
      if (Object.keys(propData).length !== 0) {        
        this.props.getData(propData)
      }
    }

    // CONFIGURATIONS
    let confOnSale = {
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
    let confOnAVM = {
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
    let confOnSchool = {
      method: 'get',
      url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
      headers: {
        apikey: '6c16690ff86029f66c75e65d0dbe363f',
        Accept: 'application/json',
      }
    }
    let confZillowDeepSearch = {
      method: 'get',
      params: {
        'zws-id': 'X1-ZWz18t8vbiroy3_3s95g', 
        address: address[0], 
        citystatezip: address[1],
      },
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetDeepSearchResults.htm',
    }
    let confZillowProperty = {
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm',
    }
    
    // OnBoard Property Sales History & School Data
    axios(confOnSale)
    .then(dataOnSalesHistory => {
      let propLongLat = []
      finishedAPIs.onSale = true         
      propLongLat.push(dataOnSalesHistory.data.property[0].location.latitude)
      propLongLat.push(dataOnSalesHistory.data.property[0].location.longitude)
      apiObjects.onSale =  dataOnSalesHistory.data.property[0]

      axios(Object.assign(confOnSchool, {params: {latitude: propLongLat[0], longitude: propLongLat[1], radius: 15,}}))
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
    axios(confOnAVM)
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
    axios(confZillowDeepSearch)
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

  formatDO(propData) {
    let propDO = new PropertyDO()
    let p = propData

    /*
    ** Head Section Data
    */
    
    //Address - Line1 - Validation
    if (p.address) {
      if (p.address.line1) {
        propDO.address1 = p.address.line1
      }
      else if (p.address.street && p.address.street._text) {
        propDO.address1 = p.address.street._text
      }      
    }
    else {
      propDO.address1 = 'UNKNOWN'
    }

    //Address - Line2 - Validation
    if (p.address) {
      if (p.address.line2) {
        propDO.address2 = p.address.line2
      }
      else if (p.address.state && p.address.state._text && p.address.city && p.address.city._text && p.address.zipcode && p.address.zipcode._text) {
        propDO.address2 = p.address.city._text + ' ' + p.address.state._text + ', ' + p.address.zipcode._text
      }
    }
    else {
      propDO.address2 = 'UNKNOWN'
    }    

    // Squarefeet Validation
    if (p.building && p.building.size) {
      if (p.building.size.livingsize) {
        propDO.sqft = p.building.size.livingsize
      }
      else if (p.building.size.universalsize) {
        propDO.sqft = p.building.size.universalsize
      }
    }
    else {
      propDO.sqft = 'N/A'
    }

    // Latitude
    if (p.location && p.location.latitude) {
      propDO.lat = p.location.latitude
    }
    else if (p.address && p.address.latitude && p.address.latitude._text) {
      propDO.lat = p.address.latitude._text
    }
    else {
      propDO.lat = 0
    }

    // Longitude
    if (p.location && p.location.longitude) {
      propDO.long = p.location.longitude
    }
    else if (p.address && p.address.longitude && p.address.longitude._text) {
      propDO.long = p.address.longitude._text
    }
    else {
      propDO.long = 0
    }

    // Image Validation
    if (propDO.address1.length > 0 && propDO.address2.length > 0) {
      propDO.backImg = `https://maps.googleapis.com/maps/api/streetview?size=2556x1440&location=${(propDO.address1.replace(', ', '-').replace('. ', '-').replace(' ', '-') + '-' + propDO.address2.replace(', ', '-').replace('. ', '-').replace(' ', '-')).replace(' ', '-')}&pitch=10&key=AIzaSyAfYCml8BfM1V7OSizBd1pnJ7AZZTdZ58I`
    }     
    else if (propDO.lat.length > 0 && propDO.long.length > 0) {
      propDO.backImg = `https://maps.googleapis.com/maps/api/streetview?size=2556x1440&location=${propDO.lat},${propDO.long}&pitch=10&key=AIzaSyAfYCml8BfM1V7OSizBd1pnJ7AZZTdZ58I`
    }
    else if (p.images && p.images.image) {
      if (p.images.image.url[0] && p.images.image.url[0]._text) {
        propDO.backImg = p.images.image.url[0]._text
      }
      else if (p.images.image.url && p.images.image.url._text) {
        propDO.backImg = p.images.image.url._text
      }
    }
    else {
      propDO.backImg = defaultImg
    }

    /*
    ** Overview Section Data
    */    
    
    // Home Description
    if (p.homeDescription && p.homeDescription._text) {
      propDO.overview = p.homeDescription._text
    }
    else {
      propDO.overview = 'OVERVIEW UNAVAILABLE...'
    }

    /*
    ** Features Section Data
    */

    // Year Built
    if (p.summary) {
      if (p.summary.yearbuilteffective) {      
        propDO.yearBuilt = p.summary.yearbuilteffective 
      }
      else if (p.summary.yearbuilt) {
          propDO.yearBuilt = p.summary.yearbuilt
      }
    }
    else {
      propDO.yearBuilt = 'N/A'
    }

    // Pool
    if (p.lot && p.lot.poolind) {
      if (p.lot.poolind === 'Y') {            
        propDO.pool = 'Yes'
      }
      else if (p.lot.poolind === 'N') {
        propDO.pool = 'No'
      }
    }
    else {
      propDO.pool = 'N/A'
    }

    // Building Type
    if (p.building && p.building.summary) {
      if (p.building.summary.bldgType) {
        propDO.bldgType = p.building.summary.bldgType
      }
      else if (p.building.summary.imprType) {
        propDO.bldgType = p.building.summary.imprType
      }
    }
    else if (p.useCode && p.useCode._text) {
      propDO.bldgType = p.useCode._text
    }
    else {
      propDO.bldgType = 'N/A'
    }

    // Lot Size
    if (p.lot) {
      if (p.lot.lotsize1) {
        propDO.lotSize = this.toCommaNumber(Math.floor(p.lot.lotsize1 * 43560)) + ' sqft'
      }
      else if (p.lot.lotsize2) {
        propDO.lotSize = p.lot.lotsize2 + ' sqft'
      }
    }
    else {
      propDO.lotSize = 'N/A'
    }

    // Cooling Type
    if (p.utilities && p.utilities.coolingtype) {
      propDO.cooling = p.utilities.coolingtype
    }
    else {
      propDO.cooling = 'N/A'
    }

    // Roofing
    if (p.building && p.building.construction && p.building.construction.roofcover) {
      propDO.roof = p.building.construction.roofcover
    }
    else {
      propDO.roof = 'N/A'
    }

    // Heating Type
    if (p.utilities && p.utilities.heatingtype) {
      propDO.heating = p.utilities.heatingtype
    }
    else {
      propDO.heating = 'N/A'
    }

    // Wall Type
    if (p.utilities && p.utilities.wallType) {
      propDO.walls = p.utilities.wallType
    }
    else {
      propDO.walls = 'N/A'
    }

    // Full Baths
    if (p.building && p.building.rooms) {
      if (p.building.rooms.bathsfull) {
        propDO.bathsFull = p.building.rooms.bathsfull
      }
      else if (p.building.rooms.bathscalc) {
        propDO.bathsFull = p.building.rooms.bathscalc
      }
    }
    else {
      propDO.bathsFull = 'N/A'
    }

    // Half Baths
    if (p.building && p.building.rooms && p.building.rooms.bathshalf) {
      propDO.bathsHalf = p.building.rooms.bathshalf
    }
    else {
      propDO.bathsHalf = 'N/A'
    }

    // Baths Total
    if (p.building && p.building.rooms) {
      if (p.building.rooms.bathsfull && p.building.rooms.bathshalf) {
        propDO.bathsTotal = p.building.rooms.bathsfull + 0.5 * p.building.rooms.bathshalf
      }
      else if (p.building.rooms.bathscalc && p.building.rooms.bathshalf) {        
        propDO.bathsTotal = p.building.rooms.bathscalc - 0.5 * p.building.rooms.bathshalf
      }
    }
    else if (p.bathrooms && p.bathrooms._text) {
      propDO.bathsTotal = p.bathrooms._text
    }
    else if (p.building && p.building.rooms && p.building.rooms.bathstotal) {
      propDO.bathsTotal = p.building.rooms.bathstotal
    }
    else {
      propDO.bathsFull = 'N/A'
    }

    // Beds
    if (p.building && p.building.rooms && p.building.rooms.beds) {
      propDO.beds = p.building.rooms.beds
    }
    else if (p.bedrooms && p.bedrooms._text) {
      propDO.beds = p.bedrooms._text
    }
    else {
      propDO.beds = 'N/A'
    }

    // Building Size
    if (p.building && p.building.size && p.building.size.bldgsize) {
      propDO.bldgSize = this.toCommaNumber(p.building.size.bldgsize) + ' sqft'
    }
    else {
      propDO.bldgSize = 'N/A'
    }

    // Ground Floor Size
    if (p.building && p.building.size && p.building.size.groundfloorsize) {
      propDO.groundFloorSize = this.toCommaNumber(p.building.size.groundfloorsize) + ' sqft'
    }
    else {
      propDO.groundFloorSize = 'N/A'
    }

    // Living Floor Size
    if (p.building && p.building.size && p.building.size.livingsize) {
      propDO.livingSize = this.toCommaNumber(p.building.size.livingsize) + ' sqft'
    }
    else {
      propDO.livingSize = 'N/A'
    }

    // Block Number
    if (p.area && p.area.blockNum) {
      propDO.blockNum = p.area.blockNum
    }
    else {
      propDO.blockNum = 'N/A'
    }

    // County Name
    if (p.area && p.area.countrysecsubd) {
      propDO.countrySecSubd = p.area.countrysecsubd
    }
    else {
      propDO.countrySecSubd = 'N/A'
    }

    // Subdivision Section
    if (p.area && p.area.subdname) {
      propDO.subdName = p.area.subdname
    }
    else {
      propDO.subdName = 'N/A'
    }

    // Tax Code Area
    if (p.area && p.area.taxcodearea) {
      propDO.taxCodeArea = p.area.taxcodearea
    }
    else {
      propDO.taxCodeArea = 'N/A'
    }

    /*
    ** Property Value Section Data
    */

    // AVM Value
    if (p.avm && p.avm.amount && p.avm.amount.value) {
      propDO.avm = currencyFormatter.format(p.avm.amount.value, {code: 'USD'})
    }
    else {
      propDO.avm = '$0.00'
    }
    
    // AVM Date
    if (p.avm && p.avm.eventDate) {
      propDO.avmDate = p.avm.eventDate
    }
    else {
      propDO.avmDate = 'N/A'
    }

    // Sales History
    if (p.salehistory) {        
      propDO.saleHistory = p.salehistory
    }
    else {
      propDO.saleHistory = []
    }

    /*
    ** School Section Data
    */

    if (p.school) {
      propDO.schools = p.school
    }
    else {
      propDO.schools = []
    }

    return propDO
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

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default SearchBar;
