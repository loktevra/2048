import * as React from 'react';
import * as ReactDOM from 'react-dom';

const domContainer = document.createElement('div');

document.body.appendChild(domContainer); 

ReactDOM.render(<div>2048</div>, domContainer);
