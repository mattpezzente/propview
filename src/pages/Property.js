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
    this.localProps = {
      propData: {},
    }
    props = {
      propData: {},
    }
    this.state = {
      propData: {},
    }

    this.getData = this.getData.bind(this)
  }

  render() {    
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps.propData = this.props.propData
    }
    if (Object.keys(this.state.propData).length !== 0) {
      this.localProps.propData = this.state.propData
    }
    return (
      <section>
        <PropHead propData={this.localProps.propData} getData={this.getData} />
        <PropOverview propData={this.localProps.propData} />
        <PropDetail propData={this.localProps.propData} />
        <PropValue propData={this.localProps.propData} />
        <PropSchool propData={this.localProps.propData} />
        <Loading loading={this.state.loading} />
      </section>
    );
  }

  getData(data) {
    if (data.loading === 'START') {
      this.setState({loading: true})
    }
    else if (data.loading === 'STOP') {
      this.setState({loading: false})
    }
    else {
      this.setState({propData: data, loading: false})
    }
  }
}

export default Property;
