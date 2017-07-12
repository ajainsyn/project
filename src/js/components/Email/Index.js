import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import { connect } from "react-redux";
import { urls } from '../../redux/constants';

import { sendEmail } from "../../redux/actions/sendEmailActions";

// custom Component
import Hero from './partial/Hero';
import LandingPage from './partial/LandingPage';

import EmailNotification from './partial/EmailNotification';
import DeveloperTools from './partial/DeveloperTools';
import Demo from './partial/Demo';
import ErrorNotification from '../../shared/ErrorNotification';
import SuccessNotification from '../../shared/SuccessNotification';

import Util from '../../shared/Util';

@connect((store) => {
  // console.log(store);
  return {
    data: store,
    success:store.sendEmail.success,
    err: store.sendEmail.err.error,
    fetching: store.sendEmail.fetching
  };
})

class Email extends Component {

  constructor() {
    super();
    this._sendEmail = this._sendEmail.bind(this);
		this._onEmailChange = this._onEmailChange.bind(this);
		this._onCcChange = this._onCcChange.bind(this);
		this._onBccChange = this._onBccChange.bind(this);
		this._onSubjectChange = this._onSubjectChange.bind(this);
		this._onBodyChange = this._onBodyChange.bind(this);
    this._onUrlChange = this._onUrlChange.bind(this);
    this._error = this._error.bind(this);
    this._LaunchModel=this._LaunchModel.bind(this);
    this._CloseModel=this._CloseModel.bind(this);

    this.state = {
      emailInfo: {
        toEmailId: '',
        ccEmailId: '',
        bccEmailId: '',
        subject: '',
        body: '',
      },
      showmodal:false,
      succ:'',   
      error: '',
      postUrl: urls.SENDEMAIL
    }
  }

  _checkValidation(email){
    let emailcombine=email.replace(';',',');
    let emailcombinesplit=emailcombine.split(',');
    let emailvalid=true;
    for(let i=0;i<emailcombinesplit.length;i++) {
    //  console.log(emailcombinesplit[i]);
      const isEmailValid = Util.isValidEmail(emailcombinesplit[i]);
      if(!isEmailValid) {
        emailvalid=false;
      }
    }
    return emailvalid;
  }

  _LaunchModel(e){
    e.preventDefault();
    this.setState({ showmodal:true, succ: '', error: '' });
  }

  _CloseModel(){
    this.setState({showmodal:false});
  }
  _sendEmail(e) {
    e.preventDefault();
    
    let isCCEmailValid, isBCCEmailValid;

    const data = this.state.emailInfo;
    let email=data.toEmailId;
    let isEmailValid=this._checkValidation(email);
    // console.log(isEmailValid);
    const serviceUrl = this.state.postUrl;
    // console.log(data.ccEmailId);
    let ccEmailId=data.ccEmailId;
    if(ccEmailId===''){
      isCCEmailValid=true;
    }
    else{
      isCCEmailValid=this._checkValidation(ccEmailId);
    }
    // console.log(isCCEmailValid);
    let bccEmailId = data.bccEmailId;
    if(bccEmailId === ''){
      isBCCEmailValid = true;
    }
    else{
      isBCCEmailValid=this._checkValidation(bccEmailId);
    }
    // console.log(isBCCEmailValid);
    
    if (data.toEmailId || (data.ccEmailId || data.bccEmailId) && isEmailValid && (isCCEmailValid || isBCCEmailValid) ) { 
      this.props.dispatch(sendEmail({data, serviceUrl}));
    } else {
      this._error('required valid email address');
    }

  }

  _error(message) {
    this.setState({ error: message });
    
  }

  _onEmailChange(e) {
  	const email = _.extend({}, this.state.emailInfo);
		email.toEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onCcChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.ccEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onBccChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.bccEmailId = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onSubjectChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.subject = e.target.value;
		this.setState({ emailInfo: email });
	}
	_onBodyChange(e) {
		const email = _.extend({}, this.state.emailInfo);
		email.body = e.target.value;
		this.setState({ emailInfo: email });
	}

  _onUrlChange(e) {
    this.setState({ postUrl: e.target.value })
  }

  componentWillReceiveProps(nextProps) {
   if(nextProps.success){
      this.setState({ showmodal: false });  
      this.setState({ succ: nextProps.success });
      this.setState({emailInfo:''});
    }
   if(nextProps.err){
      this.setState({showmodal:false});  
    
      this.setState({ error: nextProps.err });
    }
  }

  render() {
    const email = this.state.emailInfo;
    const { fetching } = this.props;
    const error = this.state.error;
    const success = this.state.succ;
    const showError = error ? <ErrorNotification data={error} dispatch={this.props.dispatch} /> : '';
    const showSuccess = success ? <SuccessNotification data={success.message}  /> : '';
    let pagedisplay;
    // console.log(this.state.showmodal);
    if(this.state.showmodal){
    pagedisplay= <Demo toEmailId={email.toEmailId || 'receiver@emailaddress.com'}
              ccEmailId={email.ccEmailId || 'ccReceiver@emailaddress.com'}
              bccEmailId={email.bccEmailId || 'bccReceiver@emailaddress.com'}
              subject={email.subject || 'your email subject line'}
              body={email.body || 'email body content here'}
              url={this.state.postUrl || '/sendMail/1.0'}
              sendEmail={this._sendEmail}
              onBodyChange={this._onBodyChange}
              onSubjectChange={this._onSubjectChange}
              onBccChange={this._onBccChange}
              onCcChange={this._onCcChange}
              onEmailChange={this._onEmailChange}
              onUrlChange={this._onUrlChange}
              fetching={fetching}
              onCloseModel={this._CloseModel}
        />
    }

    return (
      <div>
        {showSuccess}
        {showError}
        <Hero onLaunchModel={this._LaunchModel}/>
        <LandingPage onLaunchModel={this._LaunchModel}/>
        <EmailNotification  onLaunchModel={this._LaunchModel} />
        <DeveloperTools />
        {pagedisplay}
      </div>
    );
  }
}

export default Email;