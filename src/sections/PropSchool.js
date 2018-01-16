import React, { Component } from 'react';
import imgSchoolPlaceholder from '../images/propview-school-placeholder.png';
import '../styles/css/PropSchool.css';

class PropOverview extends Component {

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    let schoolHTML
    if (this.props.propData) {
      schoolHTML = this.props.propData.school.map((key, i) => {
        if (i >= 4) {
          return null
        }
        else {
          return ([
            <li key={i}>
              <img src={imgSchoolPlaceholder} alt="school institution" />
              <h3>{this.toTitleCase(key.School.InstitutionName)}</h3>
              <p>Type: <span>{this.toTitleCase(key.School.Filetypetext)}</span></p>
              <p>Distance: <span>{key.School.distance}mi</span></p>
            </li>
          ])
        }
      })
    }    
    return (
      <section className="prop-container off-white">
        <div className="prop-wrapper center-content">
          <h2>Schools Nearby</h2>
          <ul className="propschool-school-container">
            {schoolHTML}
          </ul>
        </div>
      </section>
    );
  }
}

export default PropOverview;
