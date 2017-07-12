import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

// custom Component
import Hero from './partial/Hero';
import LandingPage from './partial/LandingPage';
import EmailNotification from './partial/EmailNotification';
import DeveloperTools from './partial/DeveloperTools';
import Util from '../../shared/Util';



class Email extends Component {

  constructor() {
    super();
    this._LaunchModel=this._LaunchModel.bind(this);
    this._CloseModel=this._CloseModel.bind(this);
    this.state = {
      showmodal:false,
     
    }
  }

 

  _LaunchModel(e){
    e.preventDefault();
    this.setState({ showmodal:true});
  }

  _CloseModel(){
    this.setState({showmodal:false});
  }

 render() {
    return (
        <div>
        <Hero onLaunchModel={this._LaunchModel}/>
        <LandingPage onLaunchModel={this._LaunchModel}/>
        <EmailNotification  onLaunchModel={this._LaunchModel} />
        <DeveloperTools />
       </div>
     
    );
  }
}

export default Email;