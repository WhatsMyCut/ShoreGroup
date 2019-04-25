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
    this.setState({ currentTab: this.props.currentTab });
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  setHash(hash: string) {
    (window as any).location.hash = hash;
  }

  // Data for CommandBar
  private getItems = () => {
    let generalActive =
      this.state.currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive =
      this.state.currentTab === 'attachments' ? 'active' : '';
    let tasksActive = this.state.currentTab === 'tasks' ? 'active' : '';

    return [
      {
        key: 'newItem',
        name: 'General',
        className: generalActive,
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'General',
        onClick: () => this.setHash('general'),
      },
      {
        key: 'attachments',
        name: 'Attachments',
        className: attachmentsActive,
        iconProps: {
          iconName: 'FilePDB',
        },
        ['data-automation-id']: 'uploadButton',
        onClick: () => this.setHash('attachments'),
      },
      {
        key: 'share',
        name: 'Tasks',
        className: tasksActive,
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
