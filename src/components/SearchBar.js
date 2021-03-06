import React, { Component } from 'react';
import axios from 'axios';
import '../styles/css/SearchBar.css'
import PropertyDTO from '../PropertyDTO';
import defaultImg from '../images/propview-property-unavailable.png';
const parser = require('parse-address');
const convert = require('xml-js');
const currencyFormatter = require('currency-formatter');

/*
* Search component to find the user given ADDRESS, and return
* the property that matches the users query.
*/

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.localProps = {
      loading: false
    }

    this.checkAddress = this.checkAddress.bind(this)    
    this.fetchGivenAddress = this.fetchGivenAddress.bind(this)
  }

  componentDidMount() {
    // Add event listener to input field to activate on enter key
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
      <div className="search-bar-container">        
        <input className="search-address" type="text" data-address placeholder="14807 Faversham Cir # 1, Orlando, FL 32826"/>
        <button onClick={this.checkAddress} className="search-address-button"><img alt="search button for entered address" src={require('../images/propview-search-icon-white.png')}/></button>
      </div>
    );
  }

  // Method to check the address validity, and begin API calls if successful
  checkAddress(e) {
    // Get the address, and return validation results
    let address = this.validateAddress(document.querySelector('.search-address').value)
    // Proceed if address is valid
    if (address) {
      this.fetchGivenAddress(address)
    }
    else {
      alert('Invalid address, please enter a valid address.')
    }
  }

  // Method to begin fetching the data from APIs
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
      // Variable to store method for passing the gathered data
      let sendData = () => {
        let propData = {}
        // Check if all API calls have finished, exit if they aren't
        for (let status in finishedAPIs) {
          if (finishedAPIs[status] === false) {
            return
          }
        }
        // Merge API data in order
        propData = Object.assign({}, apiObjects.onProperty, apiObjects.onSchools, apiObjects.onAVM, apiObjects.onSale, apiObjects.zillSearch, apiObjects.zillProperty)

        // Return the data with the PropertyDTO format
        this.sendDTO(propData)  
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

        // OnBoard School Data
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

      // Zillow Property Search
      axios(confZillowDeepSearch)
      .then(dataZillSearch => {
        finishedAPIs.zillSearch = true
        dataZillSearch = convert.xml2js(dataZillSearch.data, {compact: true, spaces: 2})["SearchResults:searchresults"].response.results.result
        apiObjects.zillSearch = dataZillSearch
        dataZillSearch = dataZillSearch.zpid._text

        // Zillow Property Details
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

  // Method to package and send property data to components
  sendDTO(propData) {
    // Create Data Transfer Object
    let propDO = new PropertyDTO()
    // Re-store propData in smaller variable name
    let p = propData
    //Method to pass the DTO to the other components
    let sendData = propertyDTO => {
      this.localProps.loading = false
      this.props.getData(propertyDTO)
    }

    /*
    ** Head Section Data
    */
    
    //Address - Line1 - Validation
    if (p.address && p.address.line1) {
      propDO.address1 = p.address.line1
    }
    else if (p.address && p.address.street && p.address.street._text) {
      propDO.address1 = p.address.street._text
    }
    else {
      propDO.address1 = 'UNKNOWN'
    }

    //Address - Line2 - Validation
    if (p.address && p.address.line2) {
      propDO.address2 = p.address.line2
    }
    else if (p.address && p.address.state && p.address.state._text && p.address.city && p.address.city._text && p.address.zipcode && p.address.zipcode._text) {
      propDO.address2 = p.address.city._text + ' ' + p.address.state._text + ', ' + p.address.zipcode._text
    }
    else {
      propDO.address2 = 'UNKNOWN'
    }

    // Squarefeet Validation
    if (p.building && p.building.size && p.building.size.livingsize) {
      propDO.sqft = p.building.size.livingsize
    }
    else if (p.building && p.building.size && p.building.size.universalsize) {
      propDO.sqft = p.building.size.universalsize
    }
    else if (p.finishedSqFt && p.finishedSqFt._text) {
      propDO.sqft = p.finishedSqFt._text
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
    if (p.summary && p.summary.yearbuilteffective) {
      propDO.yearBuilt = p.summary.yearbuilteffective 
    }
    else if (p.summary && p.summary.yearbuilt) {
      propDO.yearBuilt = p.summary.yearbuilt
    }  
    else {
      propDO.yearBuilt = 'N/A'
    }

    // Pool
    if (p.lot && p.lot.poolind && p.lot.poolind) {
      if (p.lot.poolind === 'Y') {
        propDO.pool = 'Yes'
      }
      else if (p.lot.poolind === 'N') {
        propDO.pool = 'No'
      }
      else {
        propDO.pool = 'N/A'
      }
    }
    else {
      propDO.pool = 'N/A'
    }

    // Building Type
    if (p.building && p.building.summary && p.building.summary.bldgType) {      
        propDO.bldgType = p.building.summary.bldgType
    }
    else if (p.building && p.building.summary && p.building.summary.imprType) {
        propDO.bldgType = p.building.summary.imprType
    }
    else if (p.summary && p.summary.propclass) {
      propDO.bldgType = p.summary.propclass
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
    if (p.lotSizeSqFt && p.lotSizeSqFt._text) {
      propDO.lotSize = p.lotSizeSqFt._text
    }
    else if (p.lot && p.lot.lotSize1) {
      propDO.lotSize = Math.floor(p.lot.lotSize1 * 43560)
    }
    else if (p.lot && p.lot.lotSize2) {
      propDO.lotSize = p.lot.lotSize2
    }
    else if (p.lot && p.lot.lotsize1) {
      propDO.lotSize = Math.floor(p.lot.lotsize1 * 43560)
    }
    else if (p.lot && p.lot.lotsize2) {
      propDO.lotSize = p.lot.lotsize2 + ' sqft'
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

    // Half Baths    
    if (p.building && p.building.rooms && p.building.rooms.bathstotal && p.bathrooms && p.bathrooms._text) {
      propDO.bathsHalf = Math.abs(this.calcBaths(0.5, 1, parseFloat(p.bathrooms._text), p.building.rooms.bathstotal)[0])
    }
    else if (p.building && p.building.rooms && p.building.rooms.bathshalf) {
      propDO.bathsHalf = p.building.rooms.bathshalf
    }
    else {
      propDO.bathsHalf = 'N/A'
    }

    // Full Baths    
    if (p.building && p.building.rooms && p.building.rooms.bathstotal && p.bathrooms && p.bathrooms._text) {
      propDO.bathsFull = Math.abs(this.calcBaths(0.5, 1, parseFloat(p.bathrooms._text), p.building.rooms.bathstotal)[1])
    }
    else if (p.building && p.building.rooms && p.building.rooms.bathsfull) {
      propDO.bathsFull = p.building.rooms.bathsfull
    }
    else if (propDO.bathsHalf && p.building && p.building.rooms && p.building.rooms.bathscalc) {
      if (propDO.bathsHalf > 0) {
        propDO.bathsFull = parseFloat(p.building.rooms.bathscalc) - 0.5 * parseFloat(propDO.bathsHalf)
      }
      else {
        propDO.bathsFull = p.building.rooms.bathscalc
      }      
    }
    else {
      propDO.bathsFull = 'N/A'
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
      propDO.bldgSize = p.building.size.bldgsize
    }
    else {
      propDO.bldgSize = 'N/A'
    }

    // Ground Floor Size
    if (p.building && p.building.size && p.building.size.groundfloorsize) {
      propDO.groundFloorSize = p.building.size.groundfloorsize
    }
    else {
      propDO.groundFloorSize = 'N/A'
    }

    // Living Floor Size
    if (p.building && p.building.size && p.building.size.livingsize) {
      propDO.livingSize = p.building.size.livingsize
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
      propDO.avm = p.avm.amount.value
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

    /*
    ** Formatting the Data for Dispatch
    */ 

    propDO.address1 = this.toTitleCase(propDO.address1)
    propDO.address2 = this.toTitleCase(propDO.address2)
    propDO.sqft = this.toCommaNumber(propDO.sqft)
    propDO.bldgType = this.toTitleCase(propDO.bldgType)
    propDO.lotSize = this.toCommaNumber(propDO.lotSize) + ' sqft'
    propDO.cooling = this.toTitleCase(propDO.cooling.replace('.', ' / '))
    propDO.roof = this.toTitleCase(propDO.roof)
    propDO.heating = this.toTitleCase(propDO.heating.replace('.', ' / '))
    propDO.walls = this.toTitleCase(propDO.walls)
    propDO.bldgSize = this.toCommaNumber(propDO.bldgSize) + ' sqft'
    propDO.groundFloorSize = this.toCommaNumber(propDO.groundFloorSize) + ' sqft'
    propDO.livingSize = this.toCommaNumber(propDO.livingSize) + ' sqft'    
    propDO.countrySecSubd = this.toTitleCase(propDO.countrySecSubd)
    propDO.subdName = this.toTitleCase(propDO.subdName)
    propDO.avm = currencyFormatter.format(propDO.avm, {code: 'USD'})

    sendData(propDO)
  }

  // Method to validate a given address, returning "false" if 
  // a format cannot be found
  validateAddress(address) {
    let addressLines = []
    let line1 = ''
    let line2 = ''

    address = parser.parseLocation(address)
    
    if (address !== null && address.number && address.street && address.type && address.city && address.state) {
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

  // Randomly return a key for use in API calls
  getAPIKey() {
    let apiKeys = [
      '310f8dd2c3614e3a56e034f378a8263c',
      'e163766548682aeef98a164fc3c62e38'
    ]
    return apiKeys[Math.floor(Math.random() * (apiKeys.length-1))]
  }

  // Capitalizes first letter of each word in a sentence
  toTitleCase(str) {
    // Check if there is no value
    if (str === 'N/A') {
      return 'N/A'
    }
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Add commas to number
  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Calculates the number of half-baths and full-baths
  calcBaths(val1, val2, amt, total) {
    let numbers = [0,0]
    numbers[0] = (amt - total*val2)/(val1-val2)
    numbers[1] = total - numbers[0]
    return numbers
  }
}

export default SearchBar;
