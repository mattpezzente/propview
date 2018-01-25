import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from './components/Loading';
import './styles/css/reset.css';
import './styles/css/App.css';

import Footer from './sections/Footer';
import Landing from './pages/Landing';
import Property from './pages/Property';

class App extends Component {
  constructor(props) {
    super(props);
    this.redirect = false
    this.state = {
      propData: {},
      loading: false,
    }
    
    this.getData = this.getData.bind(this)
    this.clearRedirect = this.clearRedirect.bind(this)
  }

  render() {    
    return (
      <div>
        <Switch>          
          <Route exact path={process.env.PUBLIC_URL+'/home'} render={() => {
            if (this.redirect) {
              this.clearRedirect()
              return <Redirect to={process.env.PUBLIC_URL+'/property'} />            
            }
            else {
              return <Landing getData={this.getData} />
            }
          }}/>
          <Route exact path={process.env.PUBLIC_URL+'/property'} render={() => {
            return <Property propData={this.state.propData} />
          }}/>
          <Route render={() => {
            if (this.redirect) {
              this.clearRedirect()
              return <Redirect to={process.env.PUBLIC_URL+'/property'} />            
            }
            else {
              return <Landing getData={this.getData} />
            }
          }}/>
        </Switch>
        <Loading loading={this.state.loading} />
        <Footer />
      </div>
    );
  }

  // Method to allow data to be passed through components, and
  // determine/set loading states
  getData(data) {
    if (data.loading === 'START') {
      this.setState({loading: true})
    }
    else if (data.loading === 'STOP') {
      this.setState({loading: false})
    }
    else {
      this.redirect = true      
      this.setState({propData: data, loading: false})
    }
  }

  clearRedirect() {
    this.redirect = false
  }
}

export default App;
