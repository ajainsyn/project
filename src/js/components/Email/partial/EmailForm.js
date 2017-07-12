import React from 'react';
import LoadingButton from '../../../shared/LoadingButton';

const EmailForm = ({...props}) => (
  <form className="form-default" onSubmit={props.sendEmail}>
    <div className="form-box">
      <label htmlFor="serivceUrl" className="form-label">Service URL</label>
      <input id="serivceUrl" name="serivceUrl" value={props.url} className="form-input" type="text" onChange={props.onUrlChange} />
    </div>

    <h3>Enter your email details</h3>
    
    <div className="form-box">
      <label htmlFor="toEmailId" className="form-label">Email To</label>
      <textarea id="toEmailId" name="toEmailId" className="form-input" type="email" rows="1" onChange={props.onEmailChange} />
    </div>

    <div className="form-hr">
      <div className="form-box">
        <label htmlFor="ccEmailId" className="form-label">CC</label>
        <textarea id="ccEmailId" name="ccEmailId" className="form-input" type="email" rows="1" onChange={props.onCcChange} />
      </div>
      <div className="form-box">
        <label htmlFor="bccEmailId" className="form-label">BCC</label>
        <textarea id="bccEmailId" name="bccEmailId" className="form-input" type="email" rows="1" onChange={props.onBccChange} />
      </div>
    </div>
    <div className="form-box">
      <label htmlFor="subject" className="form-label">Subject</label>
      <textarea id="subject" name="subject" className="form-input" type="email" rows="1" onChange={props.onSubjectChange} />
    </div>
    <div className="form-box">
      <label htmlFor="body" className="form-label">Message</label>
      <textarea id="body" name="body" className="form-input" onChange={props.onBodyChange}>
      </textarea>
    </div>
    <div className="buttons">
      <LoadingButton title="Send Email" type="submit" className="btn btn-default" fetching={props.fetching} />
    </div>
  </form>
);

export default EmailForm;