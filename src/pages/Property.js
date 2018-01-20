import React, { Component } from 'react';
import Loading from '../components/Loading';
import PropHead from '../sections/PropHead';
import PropOverview from '../sections/PropOverview';
import PropDetail from '../sections/PropDetail';
import PropValue from '../sections/PropValue';
import PropSchool from '../sections/PropSchool';
import '../styles/css/Property.css';


class Property extends Component {
  constructor(props) {
    super(props);
    document.title = 'PropView - Property'
    this.state = {
      propData: '',
      loading: false,
    }

    this.getData = this.getData.bind(this)
  }

  render() {
    let propData = ''
    if (this.props.propData) {
      propData = this.props.propData      
    }
    else {
      propData = this.state.propData
    }
    return (
      <section>
        <PropHead propData={propData} getData={this.getData} />
        <PropOverview propData={propData} />
        <PropDetail propData={propData} />
        <PropValue propData={propData} />
        <PropSchool propData={propData} />
        <Loading loading={this.state.loading} />
      </section>
    );
  }

  getData(data) {
    if (data === 'START') {
      this.setState({loading: true})
    }
    else if (data === 'STOP') {
      this.setState({loading: false})
    }
    else {
      this.redirect = true
      this.setState({propData: data, loading: false})
    }
  }
}

export default Property;
