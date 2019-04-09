import React from 'react';
import { defineComponent } from 'js-react-utils';

export default defineComponent({
  displayName: 'SearchIcon',

  render() {
    return (
      <svg width="20px" height="20px" viewBox="0 -24 620 580">
        <g fill="currentColor">
          <path
            d="M549.869,62.246c-82.861-82.995-217.223-82.995-300.103,0c-77.175,77.29-82.382,199.284-15.795,282.72L0.034,579.228
            l32.796,32.835l233.822-234.147c83.34,67.448,205.755,62.413,283.217-15.145C632.749,279.775,632.749,145.222,549.869,62.246z
            M520.174,333.019c-66.492,66.588-174.28,66.588-240.772,0c-66.492-66.587-66.492-174.529,0-241.116s174.28-66.587,240.772,0
            S586.667,266.45,520.174,333.019z"
          />
        </g>
      </svg>
    );
  },
});
