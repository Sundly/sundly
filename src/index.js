// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

// Styles
import './index.css';

//Routes
import AppRoutes from './routes'

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
      <AppRoutes />
  </BrowserRouter>, 
  document.getElementById('root'));
registerServiceWorker();
