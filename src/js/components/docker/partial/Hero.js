import React from 'react';
import BrandLogo from '../../../shared/BrandLogo';
import introVideoPath from '../../../../assets/images/video/synbaas_intro.mp4';
import videoPlaceholder from '../../../../assets/images/video/video-placholder.jpg';
import docker from '../../../../assets/images/docker_hub.png';
const Hero = ({...props}) => (
  <div className="hero hero-white">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-7">
          <h1 className="page-title">Docker</h1>
          <h2  className="page-title-sub">provide services for gateway</h2>
          
          <p><strong>SynBaaS</strong> provides you the Powerful APIs that enable you to send, receive and track email effortlessly.</p>
          <a href="https://hub.docker.com/ " className="btn" >Launch Demo</a>
        </div>
        <div className="col-5">
          <img src={docker} alt="docker flow" />
        </div>
      </div>
    </div>
  </div>
);

export default Hero;