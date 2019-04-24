import React, { Component, MouseEvent } from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
}

export default class JobActions extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  render() {
    let disabled = false;
    let checked = false;

    return (
      <div>
        <IconButton
          data-automation-id="test"
          disabled={disabled}
          checked={checked}
          iconProps={{ iconName: 'Settings' }}
          text="Job Actions"
          onClick={() => this.alertClicked}
          split
          aria-roledescription={'split button'}
          // styles={customSplitButtonStyles}
          menuProps={{
            items: [
              {
                key: 'editJob',
                text: 'Edit Job',
                iconProps: { iconName: 'ColumnLeftTwoThirdsEdit' },
              },
              {
                key: 'pauseJob',
                text: 'Pause Job',
                iconProps: {
                  iconName: 'CirclePause',
                  style: { color: '#f4c242' },
                },
                onClick: () => console.log('here'),
              },
              {
                key: 'cancelJob',
                text: 'Cancel Job',
                iconProps: { iconName: 'Cancel', style: { color: 'red' } },
              },
            ],
          }}
        />
      </div>
    );
  }
}
