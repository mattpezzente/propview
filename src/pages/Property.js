import React, { Component } from 'react';
import '../styles/css/Property.css';


import PropHead from '../sections/PropHead';
import PropOverview from '../sections/PropOverview';
import PropDetail from '../sections/PropDetail';
import PropValue from '../sections/PropValue';
import PropSchool from '../sections/PropSchool';
import Footer from '../sections/Footer';


class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    // let url = '../json/property.json'
    // let loadFetchedData = (fetchedData) => {
    //   this.setState({data: fetchedData})
    //   console.log(fetchedData)
    // }
    // fetch(url)
    // .then(data => {
    //   loadFetchedData()
    // })
    let data = require('../json/property.json')
    data = data['property'][0]
    this.setState({data: data})
  }

  render() {
    return (
      <section>
        <PropHead propData={this.state.data} />
        <PropOverview propData={this.state.data} />
        <PropDetail propData={this.state.data} />
        <PropValue propData={this.state.data} />
        <PropSchool propData={this.state.data} />
        <Footer />
      </section>
    );
  }


}

export default Property;
