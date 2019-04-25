import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
}

export default class JobDetail extends Component<IProps, {}> {
  constructor(props) {
    super(props);
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  // Data for CommandBar
  private getItems = () => {
    return [
      {
        key: 'newItem',
        name: 'General',
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'General',
        onClick: () => console.log('General'),
      },
      {
        key: 'attachments',
        name: 'Attachments',
        iconProps: {
          iconName: 'FilePDB',
        },
        ['data-automation-id']: 'uploadButton',
        onClick: () => console.log('Attachments'),
      },
      {
        key: 'share',
        name: 'Tasks',
        iconProps: {
          iconName: 'ClipboardList',
        },
        onClick: () => console.log('Share'),
      },
    ];
  };

  render() {
    let disabled = false;
    let checked = false;

    return (
      <div className="job-detail-container">
        <CommandBar
          items={this.getItems()}
          //overflowItems={this.getOverlflowItems()}
          overflowButtonProps={{ ariaLabel: 'More commands' }}
          //farItems={this.getFarItems()}
          ariaLabel={
            'Use left and right arrow keys to navigate between commands'
          }
        />
        <div className="job-detail-panel">
          <div className="general active">
            <p>general</p>
          </div>
          <div className="attachments">
            <p>attachments</p>
          </div>
          <div className="tasks">
            <p>tasks</p>
          </div>
        </div>
      </div>
    );
  }
}
