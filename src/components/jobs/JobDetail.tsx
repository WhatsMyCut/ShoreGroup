import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel } from '../../models/IJobModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
  currentTab?: string;
}

export interface IState {
  currentTab?: string;
}
export const State: IState = {
  currentTab: 'general',
};

export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props);
    this.state = state;
  }

  componentWillMount() {
    this.getHash();
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  private setHash(hash: string) {
    (window as any).location.hash = hash;
    this.getHash();
  }

  private getHash = () => {
    let h = window.location.hash
      ? window.location.hash.replace('#', '')
      : 'general';
    this.setState({ currentTab: h });
  };

  // Data for CommandBar
  private getItems = () => {
    const hash = this.state.currentTab;
    console.log('here2', hash);

    return [
      {
        key: 'newItem',
        name: 'General',
        className: hash === 'general' || '' ? 'active' : '',
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'General',
        onClick: () => this.setHash('general'),
      },
      {
        key: 'attachments',
        name: 'Attachments',
        className: hash === 'attachments' ? 'active' : '',
        iconProps: {
          iconName: 'FilePDB',
        },
        ['data-automation-id']: 'uploadButton',
        onClick: () => this.setHash('attachments'),
      },
      {
        key: 'share',
        name: 'Tasks',
        className: hash === 'tasks' ? 'active' : '',
        iconProps: {
          iconName: 'ClipboardList',
        },
        onClick: () => this.setHash('tasks'),
      },
    ];
  };

  render() {
    let disabled = false;
    let checked = false;
    let generalActive =
      this.state.currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive =
      this.state.currentTab === 'attachments' ? 'active' : '';
    let tasksActive = this.state.currentTab === 'tasks' ? 'active' : '';
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
          <div className={'general ' + generalActive}>
            <p>general</p>
          </div>
          <div className={'attachments ' + attachmentsActive}>
            <p>attachments</p>
          </div>
          <div className={'tasks ' + tasksActive}>
            <p>tasks</p>
          </div>
        </div>
      </div>
    );
  }
}
