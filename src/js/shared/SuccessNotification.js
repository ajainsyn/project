import React from 'react';
import { Button, Alert } from 'react-bootstrap';

const SuccessNotification = ({...props}) => { 
   console.log(props);
  return (
    <Alert bsStyle="success" >
      <p>{props.data}</p>
    </Alert>
  );
}

export default SuccessNotification;
