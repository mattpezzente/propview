import React, { Component } from 'react';
import icoPropertyValue from '../images/propvalue/propview-value-icon.png';
import '../styles/css/PropValue.css';
const currencyFormatter = require('currency-formatter');

class PropValue extends Component {
  constructor(props) {
    super(props)
    // Local props object for fallbacks, and storage of incoming props
    this.localProps = {
      avm: '$0.00',
      avmDate: 'N/A',
      saleHistory: [],
    }
    this.historyHTML = (
      <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    )
  }

  render() {
    // Check if there is data in the props
    if (Object.keys(this.props.propData).length !== 0) { 
      this.localProps = {
        avm: this.props.propData.avm,
        avmDate: this.props.propData.avmDate,
        saleHistory: this.props.propData.saleHistory,
      }

      // Sales History HTML Components
      if (this.localProps.saleHistory) {        
        this.historyHTML = this.localProps.saleHistory.map((key, i) => {
          return (
            <tr key={i}> 
              <td>{key.amount.salerecdate}</td>
              <td>{currencyFormatter.format(key.amount.saleamt, {code: 'USD'})}</td>
              <td>{key.amount.saletranstype}</td>
            </tr>
          )
        })
      }
    }
    return (
      <section className="prop-container">
        <section className="prop-wrapper center-content margin-bottom">
          <img className="propvalue-img" src={icoPropertyValue} alt="property value icon"/>
          <h2 className="propvalue-title">Property Value</h2>
          <div className="propvalue-value-container">
            <p>{this.localProps.avm}</p>
          </div>
          <p className="propvalue-subtitle">Valuated {this.localProps.avmDate}</p>
        </section>
        <section className="prop-wrapper center-content">
          <h2>History</h2>
          <table className="table-sale-history">
           <thead>
            <tr>
              <th>Date</th>
              <th>Price</th>
              <th>Type</th>
            </tr>
           </thead>
           <tbody>
            {this.historyHTML}
           </tbody>
          </table>
        </section>
      </section>
    );
  }
}

export default PropValue;
