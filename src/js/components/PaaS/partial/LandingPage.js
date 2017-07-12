import React from 'react';
import passCloud from '../../../../assets/images/paasCloudFoundryService.png';



const LandingPage = ({...props}) => (
  <section className="section" id="emailService">
    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">PaaS Cloud Foundry infrastructure</h2>
            <p>
              Easy SMTP integration and a simple, RESTful API abstracts away the messy details of sending transactional or bulk email. 
              Scale quickly, whether you need to send 10 or 10 million emails.
            </p>
            <button className="btn" onClick={props.onLaunchModel}>Launch Demo</button>
          </div>
        </div>
        <div className="col-sm-6">
           <div className="section-copy has-bgimage">
              <img src={passCloud} alt="" />
            </div>
              </div>
      </div>
    </div>
  </section>
);

export default LandingPage;