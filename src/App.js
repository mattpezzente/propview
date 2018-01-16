import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './styles/css/reset.css';
import './styles/css/App.css';

import Footer from './sections/Footer';
import Landing from './pages/Landing';
import Property from './pages/Property'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      propData: '',
    }
  }
  
  componentDidMount() {
    // let url = 'https://search.onboard-apis.com/propertyapi/v1.0.0/property/detail'
    // let apikey = '7bb280bbda2599b8a476c3ad8c884922'
    // let accept = 'application/json'
    // let propData
    // let loadFetchedData = (propData) => {
    //   this.setState({propData: propData})
    // }
    
    // axios({
    //   method: 'get',
    //   url: url,
    //   params: {
    //     'id': 48633401025,
    //   },
    //   headers: {
    //     'apikey': apikey,
    //     'Accept': accept
    //   }
    // })
    // .then(data => {
    //   propData = data.data.property[0].address;
    //   console.log(propData)
    //   loadFetchedData(propData);

    // })
  }

  render() {
    // let keys = []
    // let values = []
    // let addressElements
    // for(let addr in this.state.propData) {
    //   keys.push(addr)
    //   values.push(this.state.propData[addr])
    // }

    // addressElements = keys.map((key, i) => {
    //   let value = values[i]
    //   return <li key={key}>{key}__{value}</li>
    // }) 

    // return (
    //   <div>
    //     <h1>Hello World</h1>
    //     <ul>
    //       {addressElements}
    //     </ul>
    //   </div>
    // );
    return (
      <div>
        <Switch>            
          <Route exact path='/' component={Landing}/>
          <Route path='/property' component={Property}/>            
        </Switch>
          <Footer />
      </div>
    );
  }
}

export default App;
