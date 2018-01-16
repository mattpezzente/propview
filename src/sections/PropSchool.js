import React, { Component } from 'react';
import imgSchoolPlaceholder from '../images/propview-school-placeholder.png';
import '../styles/css/PropSchool.css';

let school = [
    {
      "Identifier": {
        "OBInstID": "5700057504"
      },
      "School": {
        "InstitutionName": "HIGH ROAD SCHOOL OF DELAWARE",
        "GSTestRating": 0,
        "gradelevel1lotext": "4TH GRADE",
        "gradelevel1hitext": "12TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.741805,
        "geocodinglongitude": -75.584499,
        "locationaddress": "2002 RODMAN RD",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19805-4135",
        "distance": 0.75
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700057709"
      },
      "School": {
        "InstitutionName": "ZION EARLY EDUCATION CENTER",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "KINDERGARTEN",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.747815,
        "geocodinglongitude": -75.576559,
        "locationaddress": "2101 LANCASTER AVE",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19805-3731",
        "distance": 1.17
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700057919"
      },
      "School": {
        "InstitutionName": "HARVEST CHRISTIAN ACADEMY - WILMINGTON",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "7TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.748221,
        "geocodinglongitude": -75.577563,
        "locationaddress": "2205 LANCASTER AVE",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19805-3733",
        "distance": 1.19
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700056222"
      },
      "School": {
        "InstitutionName": "ST MICHAEL'S SCHOOL AND NURSERY INC",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "2ND GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.741626,
        "geocodinglongitude": -75.546797,
        "locationaddress": "700 N WALNUT ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19801-3514",
        "distance": 1.97
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "01434387"
      },
      "School": {
        "InstitutionName": "ELEMENTARY WORKSHOP MONTESSORI SCHOOL",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "4TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.739006,
        "geocodinglongitude": -75.54416,
        "locationaddress": "502 N PINE ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19801-4433",
        "distance": 2.04
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700048410"
      },
      "School": {
        "InstitutionName": "TOWER HILL SCHOOL",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "12TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.76461,
        "geocodinglongitude": -75.576995,
        "locationaddress": "2813 W 17TH ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19806-1112",
        "distance": 2.31
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700048397"
      },
      "School": {
        "InstitutionName": "SHARON TEMPLE ADVENTIST ELEMENTARY SCHOOL",
        "GSTestRating": 0,
        "gradelevel1lotext": "KINDERGARTEN",
        "gradelevel1hitext": "8TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.754725,
        "geocodinglongitude": -75.544043,
        "locationaddress": "2001 N WASHINGTON ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19802-4025",
        "distance": 2.56
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700058343"
      },
      "School": {
        "InstitutionName": "VISION LEARNING CENTER",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "KINDERGARTEN",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.751613,
        "geocodinglongitude": -75.540962,
        "locationaddress": "1930 HUTTON ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19802-4905",
        "distance": 2.56
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700058341"
      },
      "School": {
        "InstitutionName": "ALTERNATIVE SCHOOL",
        "GSTestRating": 0,
        "gradelevel1lotext": "9TH GRADE",
        "gradelevel1hitext": "10TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.753105,
        "geocodinglongitude": -75.539283,
        "locationaddress": "2223 N MARKET ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19802-4227",
        "distance": 2.69
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    },
    {
      "Identifier": {
        "OBInstID": "5700058342"
      },
      "School": {
        "InstitutionName": "URBAN PROMISE SCHOOL",
        "GSTestRating": 0,
        "gradelevel1lotext": "PRESCHOOL",
        "gradelevel1hitext": "6TH GRADE",
        "Filetypetext": "PRIVATE",
        "geocodinglatitude": 39.749101,
        "geocodinglongitude": -75.530521,
        "locationaddress": "2401 THATCHER ST",
        "locationcity": "WILMINGTON",
        "stateabbrev": "DE",
        "zip54": "19802-4539",
        "distance": 2.97
      },
      "Vintage": {
        "onboardDate": "2017-9-28"
      }
    }
  ]

class PropOverview extends Component {
  constructor(props) {
    super(props);

  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  render() {
    let schoolHTML = school.map((key, i) => {
      if (i >= 4) {
        return
      }
      return ([
        <li key={i}>
          <img src={imgSchoolPlaceholder} alt="school institution photo" />
          <h3>{this.toTitleCase(key.School.InstitutionName)}</h3>
          <p>Type: <span>{this.toTitleCase(key.School.Filetypetext)}</span></p>
          <p>Distance: <span>{key.School.distance}mi</span></p>
        </li>
      ])
    })
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
