import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { useGameOverState } from '../../hooks/useGameOverState';

import './PopupGameOver.scss';

export function PopupGameOver() {
  const {
    status,
    score,
    setStatus,
   } = useGameOverState();

  return ReactDOM.createPortal(
    <Transition in={status} timeout={200}>
      {state => (
        <div
          className={[
            'popup_wrapper',
            `popup_wrapper-${state}`,
          ].join(' ')}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setStatus(false);
            }
          }}
        >
          <div className="popup">
            <h2>Game over!</h2>
            <div>You`re score: <b>{score}</b></div>
          </div>
        </div>
      )}
    </Transition>,
    document.body,
  )
}
