import { c } from './helper';

export const testsForDirectionDown = [
  [
    [c(0,0,1, '1')],
    [c(0,3,1, '1')],
  ],
  [
    [c(0,3,1, '1')],
    [c(0,3,1, '1')],
  ],
  [
    [c(1,2,1, '1')],
    [c(1,3,1, '1')],
  ],
  [
    [c(1,2,1, '1'),c(1,3,1, '2')],
    [c(1,3,2, '1')],
  ],
  [
    [c(3,0,1, '1'),c(0,0,1, '2')],
    [c(3,3,1, '1'),c(0,3,1, '2')],
  ],
  [
    [c(1,0,1, '1'),c(1,1,1, '2'),c(1,2,2, '3'),c(1,3,2, '4')],
    [c(1,3,3, '3'),c(1,2,2, '1')],
  ],
  [
    [c(1,0,1, '1'),c(1,1,2, '2'),c(1,2,3, '3'),c(1,3,4, '4')],
    [c(1,3,4, '4'),c(1,2,3, '3'),c(1,1,2, '2'),c(1,0,1, '1')],
  ],
  [
    [c(0,0,1, '1'),c(0,2,1, '2'),c(2,1,1, '3')],
    [c(0,3,2, '1'),c(2,3,1, '3')],
  ],
];
