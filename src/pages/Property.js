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
      propData: {}
    }

    this.getData = this.getData.bind(this)
  }

  render() {
    return (
      <section>
        <PropHead propData={this.state.propData} getData={this.getData} />
        <PropOverview propData={this.state.propData} />
        <PropDetail propData={this.state.propData} />
        <PropValue propData={this.state.propData} />
        <PropSchool propData={this.state.propData} />
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
      this.redirect = true
      this.setState({propData: data, loading: false})
    }
  }
}

export default Property;
