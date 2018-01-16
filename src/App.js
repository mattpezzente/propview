import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './styles/css/reset.css';
import './styles/css/App.css';

import Footer from './sections/Footer';
import Landing from './pages/Landing';
import Property from './pages/Property'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }

    this.getData = this.getData.bind(this)
  }

  render() {
    let propertyComponent = () => { 
      return <Property />
    }
    if (this.state.data !== '') {
      propertyComponent = () => {
        return <Property propData={this.state.data} />
      }
    }    
    return (
      <div>
        <Switch>            
          <Route exact path="/" render={() => {
            if (this.state.data !== '') {
              return <Redirect to='/property'/>
            }
            else {
              return <Landing getData={this.getData} />
            }
          }}/>
          <Route path='/property' component={propertyComponent} />            
        </Switch>
          <Footer />
      </div>
    );
  }

  getData(data) {
    this.setState({data: data})
  }
}

export default App;
