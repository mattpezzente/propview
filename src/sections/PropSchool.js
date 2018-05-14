import { Component } from 'react';
import '../styles/css/PropSchool.css';

class PropOverview extends Component {
  constructor(props) {
    super(props);
    // Local props object for fallbacks, and storage of incoming props
    this.localProps = {
      schools: '',
    };
    this.schoolHTML = '';
  }

  render() {
    // Check if there is data in the props
    if (Object.keys(this.props.propData).length !== 0) {
      this.localProps = {
        schools: this.props.propData.schools,
      };
      this.schoolHTML = this.localProps.schools.map((key, i) => {
        if (i >= 4) {
          return null;
        }
        const schoolGoogleURL = 'https://maps.googleapis.com/maps/api/streetview?size=1920x1080&location=' + key.School.geocodinglatitude + ',' + key.School.geocodinglongitude + '&&pitch=5&key=AIzaSyAfYCml8BfM1V7OSizBd1pnJ7AZZTdZ58I';
        return ([
          <li key={i}>
            <img src={schoolGoogleURL} alt="school institution" />
            <h3>{this.toTitleCase(key.School.InstitutionName)}</h3>
            <p>Type: <span>{this.toTitleCase(key.School.Filetypetext)}</span></p>
            <p>Distance: <span>{key.School.distance}mi</span></p>
          </li>
        ]);
      });
    }
    return (
      <section className="prop-container off-white">
        <div className="prop-wrapper center-content">
          <h2>Schools Nearby</h2>
          <ul className="propschool-school-container">
            {this.schoolHTML}
          </ul>
        </div>
      </section>
    );
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}

export default PropOverview;
