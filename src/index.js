import React from 'react';
import { render } from 'react-dom';

import { Root } from './Root';
import './assets/styles/app.scss';

const renderApp = () => {
  render(<Root />, document.querySelector('react'));
};

renderApp();