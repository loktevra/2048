import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';

const domContainer = document.createElement('div');

document.body.appendChild(domContainer); 

ReactDOM.render(<App />, domContainer);
