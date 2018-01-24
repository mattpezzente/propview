import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'
import PropertyDO from '../PropertyDO';
import defaultImg from '../images/propview-property-1.png';
const parser = require('parse-address');
const convert = require('xml-js');
const currencyFormatter = require('currency-formatter');

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.localProps = {
      loading: false
    }

    this.checkAddress = this.checkAddress.bind(this)
    this.sendDO = this.sendDO.bind(this)
    this.fetchGivenAddress = this.fetchGivenAddress.bind(this)
    this.formatAddress = this.formatAddress.bind(this)
  }

  componentDidMount() {
    document.querySelector('.search-address').addEventListener('keypress', e => {
      if (e.key === "Enter") {
        this.checkAddress()
      }
    })
  }

  componentWillUnmount() {
    window.keypress = null
  }

  render() {
    return (
      <div>        
        <input className="search-address" type="text" data-address placeholder="14807 Faversham Cir # 1, Orlando, FL 32826"/>
        <button onClick={this.checkAddress} className="search-address-button"><img alt="search button for entered address" src={require('../images/propview-search-icon.png')}/></button>
      </div>
    );
  }

  checkAddress(e) {
    let address = document.querySelector('.search-address').value
    address = this.validateAddress(address)
    if (address) {
      this.fetchGivenAddress(address)
    }
    else {
      alert('Invalid address, please enter a valid address.')
    }
  }

  fetchGivenAddress(address) {
    if (this.localProps.loading) {
      // DISABLE INPUT
    }
    else {
      // Start the loading overlay
      this.localProps.loading = true
      this.props.getData({loading: 'START'})

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
      let propData = {}
      // Variable to store method for passing the gathered data
      let sendData = () => {
        for (let status in finishedAPIs) {
          if (finishedAPIs[status] === false) {
            return
          }
        }

        // Merge API data in order
        propData = Object.assign({}, apiObjects.onProperty, apiObjects.onSchools, apiObjects.onAVM, apiObjects.onSale, apiObjects.zillSearch, apiObjects.zillProperty)          

        // Return the data with the PropertyDO format
        this.sendDO(propData)  
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
          apikey: this.getAPIKey(),
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
          apikey: this.getAPIKey(),
          Accept: 'application/json',
        }
      }
      let confOnSchool = {
        method: 'get',
        url: 'https://search.onboard-apis.com/propertyapi/v1.0.0/school/snapshot',
        headers: {
          apikey: this.getAPIKey(),
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
  }

  sendDO(propData) {
    let propDO = new PropertyDO()
    let p = propData
    let sendData = propertyDO => {
      this.localProps.loading = false      
      this.props.getData(propertyDO)
    }

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

    // Plus Seperated Address
    if (propDO.address1 && propDO.address2) {
      propDO.addressPlus = (propDO.address1 + ' ' + propDO.address2).trim()
    }

    // Squarefeet Validation
    if (p.building && p.building.size) {
      if (p.building.size.livingsize) {
        propDO.sqft = this.toCommaNumber(p.building.size.livingsize)
      }
      else if (p.building.size.universalsize) {
        propDO.sqft = this.toCommaNumber(p.building.size.universalsize)
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
    if (p.images && p.images.image) {
      if (p.images.image.url[0] && p.images.image.url[0]._text) {
        propDO.backImg = p.images.image.url[0]._text
        sendData(propDO)
      }
      else if (p.images.image.url && p.images.image.url._text) {
        propDO.backImg = p.images.image.url._text
        sendData(propDO)
      }
    }
    else if (propDO.address1.length > 0 && propDO.address2.length > 0) {
      let confGoogleAddress = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/streetview/metadata',
        params: {
          size: '1920x1080',
          location: (propDO.address1.replace(', ', '-').replace('. ', '-').replace(' ', '-') + '-' + propDO.address2.replace(', ', '-').replace('. ', '-').replace(' ', '-')).replace(' ', '-').replace(' ', '-').replace(' ', '-'),
          pitch: 5,
          key: 'AIzaSyAfYCml8BfM1V7OSizBd1pnJ7AZZTdZ58I',
        }
      }
      axios(confGoogleAddress)
      .then(data => {
        if (data.data.status === 'OK') {
          propDO.backImg = `https://maps.googleapis.com/maps/api/streetview?size=1920x1080&location=${(propDO.address1.replace(', ', '-').replace('. ', '-').replace(' ', '-') + '-' + propDO.address2.replace(', ', '-').replace('. ', '-').replace(' ', '-')).replace(' ', '-').replace(' ', '-').replace(' ', '-')}&pitch=5&key=AIzaSyAfYCml8BfM1V7OSizBd1pnJ7AZZTdZ58I`
          sendData(propDO)
        }
        else {
          propDO.backImg = defaultImg
          sendData(propDO)
        }      
      })
      .catch(err => {
        propDO.backImg = defaultImg
        sendData(propDO) 
      })
    }
    else {
      propDO.backImg = defaultImg
      sendData(propDO)
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
    else if (p.summary && p.summary.proptype) {
      propDO.bldgType = p.summary.proptype
    }
    else {
      propDO.bldgType = 'N/A'
    }

    // Lot Size
    if (p.lot) {
      if (p.lot.lotSize1) {
        propDO.lotSize = this.toCommaNumber(Math.floor(p.lot.lotSize1 * 43560)) + ' sqft'
      }
      else if (p.lot.lotSize2) {
        propDO.lotSize = this.toCommaNumber(p.lot.lotSize2) + ' sqft'
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
    if (p.building && p.building.rooms && p.building.rooms.bathsfull && p.building.rooms.bathshalf) {
        propDO.bathsTotal = p.building.rooms.bathsfull + 0.5 * p.building.rooms.bathshalf
    }
    else if (p.building && p.building.rooms && p.building.rooms.bathscalc && p.building.rooms.bathshalf) {        
      propDO.bathsTotal = p.building.rooms.bathscalc - 0.5 * p.building.rooms.bathshalf
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

    sendData(propDO)
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

  validateAddress(address) {
    let addressLines = []
    let line1 = ''
    let line2 = ''

    address = parser.parseLocation(address)    

    if (address.number && address.street && address.type && address.city && address.state) {      
      line1 += address.number + ' '
      if (address.prefix) {
        line1 += address.prefix + ' '
      }
      line1 += address.street + ' '
      line1 += address.type + ' '        

      
      line2 += address.city + ' '      
      line2 += address.state + ' '
      if (address.zip) {
        line2 += address.zip        
      }
      
      addressLines[0] = line1.trim()
      addressLines[1] = line2.trim()
      return addressLines
    }
    else {
      return false
    }
  }

  getAPIKey() {
    let apiKeys = [
      '62268cadaa62a2d8f23e5a4b77cf95ac',
      'db01c855c976f897bbcb620bcd47cae7',
      '6c16690ff86029f66c75e65d0dbe363f',
      'f09e60a344e1f8c2d61d31b33ac5ec7a',
      '14ee3d7f86bc0071c72d724c720452a3'
    ]
    return apiKeys[Math.floor(Math.random() * 4)]
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
