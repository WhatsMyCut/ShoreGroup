import React from 'react';
import { defineComponent } from 'js-react-utils';

export default defineComponent({
  displayName: 'ArrowDoubleRightIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 0 64 64">
        <g>
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="bevel"
            strokeMiterlimit="10"
            points="31,15 48,32 
            31,49"
          />
        </g>
        <g>
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="bevel"
            strokeMiterlimit="10"
            points="16,15 33,32 
            16,49"
          />
        </g>
      </svg>
    );
  },
});
