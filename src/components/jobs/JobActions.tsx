import React, { Component, MouseEvent } from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
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
          menuIconProps={{
            iconName: 'MoreVertical',
            style: { fontWeight: 'bolder' },
          }}
          role="button"
          aria-haspopup={true}
          aria-label="Show actions"
          styles={{
            root: {
              float: 'right',
              height: 'inherit',
              paddingTop: 8,
              fontSize: 28,
            },
          }}
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
