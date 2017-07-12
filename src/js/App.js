// import "bootstrap";
import React from 'react';
import { Route } from 'react-router-dom';
import Header from './shared/Header';
import Home from './components/Home';
import About from './components/About';
import Email from './components/Email';
import Login from './components/Retail/Login/';
import Retail from './components/Retail';
import DeviceRegistration from './components/IOT/DeviceRegistration';
import Docker from './components/Docker';
import ServiceDiscovery from './components/ServiceDiscovery';
import PaaS from './components/PaaS';
import EdgeServer from './components/EdgeServer';
import PushNotificationService from './components/PushNotificationService';
import SocialService from './components/SocialService';
import TwitToServe from './components/TwitToServe';

// import Async from 'react-code-splitting'

// const Home = () => <Async load={ import('./components/Home') } />;

const App = () => (
  <div>
    <Header menuItem={menuItem} />
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/email-notification" component={Email} />
    <Route path="/retail-digital-banking" component={Login} />
    <Route path="/my-account/:id?" component={Retail} />
    <Route path="/event-processing-from-devices" component={DeviceRegistration} />
    <Route path="/docker-hub" component={Docker}/>
    <Route path="/service-discovery"  component={ServiceDiscovery}/>
    <Route path="/paaS-cloud-foundry" component={PaaS}/>
    <Route path="/api-Gateway" component={EdgeServer}/> 
    <Route path="/push-notification" component={PushNotificationService}/> 
    <Route path="/tweet2Server" component={TwitToServe}/> 
    

  </div>
);

export default App;


const menuItem = [
  {
    "title": "Infrastructure Services",
    "submenu": [
      'About',
      'Service Discovery',
      'Service Monitor Dashboard',
      'Centralized Logging',
      'API Gateway',
      'PaaS Cloud Foundry',
      'Docker Hub'
    ]
  },
  {
    "title": "User Engagement Microservices",
    "submenu": [
      'GeoLocation',
      'Push Notification',
      'Email Notification',
      'Tweet2Server',
      'Twitter Listener'
    ]
  },
  {
    'title': "Industries",
    "submenu": [
      "Retail Digital Banking",
      "Insurance",
      "Healthcare",
      "Retail",
    ]
  },
  {
    "title": "Analytic Platform",
    "submenu": [
      "Text to Voice conversion",
      "Diabetes Analytical Model",
      "High Cost Patient",
      "Diabetic Retinopathy",
      "Chronic Obstructive Pulmonary Diseases"
    ]
  },
  {
    "title": "IoT Platform",
    "submenu": [
      "Device Registration",
      "Event Processing from Devices",
      "Device Simulator"
    ]
  }
];