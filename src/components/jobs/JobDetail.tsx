import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel } from '../../models/IJobModel';
import { IAttachment } from '../../models/IAttachment';

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

  private _renderRow(x: IAttachment) {
    const {
      Id,
      CreatedOn,
      ModifiedOn,
      Url,
      AzureBlobId,
      Name,
      Type,
      PrintReady,
      PageCount,
      SimplexOrDuplex,
      Orientation,
      Color,
      FlatSize,
      FinishSize,
      Stock,
      PlusCoverStock,
      Binding,
      Finishing,
      StatusReason,
      VariablePageLength,
    } = x;
    return <div>Name</div>;
  }

  private _renderAttachments() {
    const docs = (this.props.job.Attachments as IAttachment[]) || [];
    console.log('renderAttachments', docs);
    let retVal = '';
    docs.forEach(x => (retVal += this._renderRow(x)));
    return retVal;
  }

  render() {
    const { job } = this.props;
    const { currentTab } = this.state;
    let disabled = false;
    let checked = false;
    let generalActive = currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive = currentTab === 'attachments' ? 'active' : '';
    let tasksActive = currentTab === 'tasks' ? 'active' : '';
    const attachments = this._renderAttachments();
    let jobName = job ? job.Name : '–';
    let jobType = job && job.Type ? job.Type.Name : '–';
    return (
      <div className="job-detail-container">
        <div className="job-detail-main">
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
              <div>
                <div>Job Name</div>
                <div>{jobName}</div>
              </div>
              <div>
                <h5>Job Type</h5>
                <p>{jobType}</p>
              </div>
            </div>
            <div className={'attachments ' + attachmentsActive}>
              <p>{attachments}</p>
            </div>
            <div className={'tasks ' + tasksActive}>
              <p>tasks</p>
            </div>
          </div>
        </div>
        <div className={'job-detail-comments'}>
          <h5>Comments</h5>
          <p>[PLACEHOLDER]</p>
        </div>
      </div>
    );
  }
}