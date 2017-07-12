import React from 'react';
import apiService from '../../../../assets/images/api-services.png';

const ApiNotification = ({...props}) => (
  <section className="section bg-blue" id="emailNotification">
    <div className="container">
      <div className="row align-items-center">
        
        <div className="col-sm-6">
          <div className="section-copy">
            <h2 className="title">About API Service Platform</h2>
            <p>SynBaaS provides platform to <strong>build and deploy machine learning/analytics models</strong> (R and Python) as microservices and exposes the models as APIs.</p>
            <p>Enterprise applications and external users can connect to the platform using <strong>REST API to score, evaluate and monitor</strong> the models.</p>
            <button className="btn" onClick={props.onLaunchModel} >Launch Demo</button>
          </div>
        </div>
        <div className="col-sm-6">
            <div className="section-copy has-bgimage">
              <img src={apiService} alt="" />
            </div>
        </div>
      </div>
    </div>
  </section>
);

export default ApiNotification;