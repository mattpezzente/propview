import React, { Component } from 'react';
import icoPropertyValue from '../images/propvalue/propview-value-icon.png';
import '../styles/css/PropValue.css';
let currencyFormatter = require('currency-formatter');

class PropValue extends Component {
  constructor(props) {
    super(props)
    this.localProps = {
      avm: '$0.00',
      avmDate: 'N/A',
      saleHistory: [],
    }
  }

  render() {      
    if (Object.keys(this.props.propData).length !== 0) {
      let p = this.props.propData
      let avm
      let avmDate
      let saleHistory
      
      try {
        // AVM Value
        if (p.avm.amount.value) {
          avm = p.avm.amount.value
        }
        else {
          avm = '$0.00'
        }
        
        // AVM Date
        if (p.avm.eventDate) {
          avmDate = p.avm.eventDate
        }
        else {
          avmDate = 'N/A'
        }
        
        // Sales History
        if (p.salehistory) {        
          saleHistory = p.salehistory.map((key, i) => {
            return (
              <tr key={i}> 
                <td>{key.amount.salerecdate}</td>
                <td>{currencyFormatter.format(key.amount.saleamt, {code: 'USD'})}</td>
                <td>{key.amount.saletranstype}</td>
              </tr>
            )
          })
        }
      } catch(err) {
        console.log(err)
      }


      this.localProps = {
        avm: currencyFormatter.format(avm, {code: 'USD'}),
        avmDate: avmDate,
        saleHistory: saleHistory,
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
            {this.localProps.saleHistory}
           </tbody>
          </table>
        </section>
      </section>
    );
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default PropValue;
