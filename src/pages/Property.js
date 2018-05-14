import React, { Component } from 'react';
import Loading from '../components/Loading';
import PropHead from '../sections/PropHead';
import PropOverview from '../sections/PropOverview';
import PropDetail from '../sections/PropDetail';
import PropValue from '../sections/PropValue';
import PropSchool from '../sections/PropSchool';
import '../styles/css/Property.css';

/*
* Properties page to display the property data being called from the APIs
*/

class Property extends Component {
  constructor(props) {
    super(props);
    // Set Page Title
    document.title = 'PropView - Property';
    this.localProps = {
      propData: {},
    };
    this.props = {
      propData: {},
    };
    this.state = {
      propData: {},
    };


    this.getData = this.getData.bind(this);
  }

  componentWillUpdate() {
    // Check if the data is coming through props, or state
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps.propData = this.props.propData;
    }
    if (Object.keys(this.state.propData).length !== 0) {
      this.localProps.propData = this.state.propData;
    }
  }

  render() {
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

  // Method to allow data to be passed through components, and
  // determine/set loading states
  getData(data) {
    if (data.loading === 'START') {
      this.setState({ loading: true });
    } else if (data.loading === 'STOP') {
      this.setState({ loading: false });
    } else {
      this.setState({ propData: data, loading: false });
    }
  }
}

export default Property;
