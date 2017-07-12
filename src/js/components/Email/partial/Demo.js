import React from 'react';

import EmailForm from './EmailForm';
import SuggestedValue from './SuggestedValue';

const Demo = ({...props}) => (
<div className="modal fade bd-example-modal-lg show" tabIndex="-1" role="dialog" >
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title" id="myLargeModalLabel">SynBass Email Demo</h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onCloseModel}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
       <section className="section" id="emailService">
          <div className="row">
            <div className="col-sm-7">
              <div className="email-form">
                <EmailForm {...props} />
              </div>
            </div>
            <div className="col-sm-5">
              <SuggestedValue {...props} />
            </div>
          </div>
      </section>
      </div>
    </div>
  </div>
</div>
  

);

export default Demo;