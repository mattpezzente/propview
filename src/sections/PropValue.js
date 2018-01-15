import React, { Component } from 'react';
import icoPropertyValue from '../images/propvalue/propview-value-icon.png';
import '../styles/css/PropValue.css';
let currencyFormatter = require('currency-formatter');

let testValues = [
  {
    amount: {
      saleamt: 268500,
      salerecdate: "2014-7-24",
      "saletranstype": "Resale"
    }
  }, {
    amount: {
      saleamt: 288939,
      salerecdate: "2009-4-14",
      "saletranstype": "Mortgage"
    }
  },
]

class PropValue extends Component {
  constructor(props) {
    super(props);

  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  toCommaNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    console.log(testValues)
    let saleRows = testValues.map((key, i) => {
      return (
        <tr key={i}> 
          <td>{key.amount.salerecdate}</td>
          <td>{currencyFormatter.format(key.amount.saleamt, {code: 'USD'})}</td>
          <td>{key.amount.saletranstype}</td>
        </tr>
      )
    })

    return (
      <section className="prop-container">
        <section className="prop-wrapper center-content margin-bottom">
          <img className="propvalue-img" src={icoPropertyValue} alt="property value icon"/>
          <h2 className="propvalue-title">Property Value</h2>
          <div className="propvalue-value-container">
            <p>{currencyFormatter.format(304630, {code: 'USD'})}</p>
          </div>
          <p className="propvalue-subtitle">Valuated 2017-11-30</p>
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
            {saleRows}
           </tbody>
          </table>
        </section>
      </section>
    );
  }
}

export default PropValue;
