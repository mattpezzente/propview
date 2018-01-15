import React, { Component } from 'react';
import '../styles/css/PropOverview.css';

class PropOverview extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <section className="prop-container">
        <div className="prop-wrapper">
          <div className="seperator-container">
            <div className="orange-line-accent"></div><h2>Overview</h2><div className="orange-line-accent"></div>
          </div>
          <span className="propover-map"></span>
          <p>This 2,100 square foot 3 bed 2.5 bath pool home is sure to impress from the moment you arrive. Lush tropical landscaping lines the driveway, which leads to a two car garage, with pond views from the front. The decorative glass double door entry leads to the open foyer and living area with high ceilings and Brazilian hardwood floors, creating a bright and open ambiance. The family room with wood burning fireplace offers immediate views of the screened pool and lanai. The kitchen features center island with stainless steel appliances, with adjacent breakfast nook and formal dining room, elevated from the family room, offering elegance and style. The downstairs master suite opens to the pool and lanai through large sliding glass doors, and the master bath includes dual sink vanity, glass enclosed walk-in shower, soaking tub and separate water closet. The upstairs loft opens to the family room, and provides the perfect space for a play room, game room, work space and more. Entertain family and friends around the screened pool, featuring water features and a huge lanai â perfect for outdoor BBQ and relaxation. Located close to UCF, with nearby shopping and dining, and zoned for great schools. Call now to schedule your showing! </p>        
        </div>
      </section>
    );
  }
}

export default PropOverview;
