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
      propData: ''
    }

    this.getData = this.getData.bind(this)
  }

  render() {
    let propData = ''
    if (this.props.propData) {
      console.log('prop')
      console.log(this.props.propData)
      propData = this.props.propData      
    }
    else {
      console.log('state')
      console.log(this.state.propData)
      propData = this.state.propData
    }
    return (
      <section>
        <PropHead propData={propData} getData={this.getData} />
        <PropOverview propData={propData} />
        <PropDetail propData={propData} />
        <PropValue propData={propData} />
        <PropSchool propData={propData} />
      </section>
    );
  }

  getData(data) {
    console.log(data)
    this.setState({propData: data})
  }
}

export default Property;
