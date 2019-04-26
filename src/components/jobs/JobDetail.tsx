import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel, IJobType } from '../../models/IJobModel';
import Attachment from '../../components/attachments/Attachment';
import { IAttachmentModel } from '../../models/IAttachmentModel';
import { List } from 'office-ui-fabric-react/lib/components/List';
import Moment from 'moment';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
  currentTab?: string;
}
export interface IListItem {
  Name?: string;
  Value?: string;
}
export interface IState {
  currentTab?: string;
}
export const State: IState = {
  currentTab: 'general',
};
export default class JobDetail extends Component<IProps, IState> {
  private _list: List<IJobModel>;

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
        key: 'main',
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

  private _renderRow(attachment: IAttachmentModel, key: number) {
    return <Attachment key={key} attachment={attachment} />;
  }

  private _renderAttachments() {
    let docs =
      (this.props.job.Attachments as IAttachmentModel[]) ||
      ([] as IAttachmentModel[]);
    return (
      <div className="attachments-container">
        {docs.map((i, index) => this._renderRow(i, index))}
      </div>
    );
  }

  private _resolveList = (list: List<IListItem>): void => {
    this._list = list;
  };

  private _getPageHeight(idx: number): number {
    return 50;
  }

  private _onRenderCell = (item: IListItem, index: number): JSX.Element => {
    return (
      <div data-is-focusable={true}>
        <div className={'item-cell'}>
          {index} &nbsp; {item.Name}
        </div>
        <div className={'item-cell'}>{item.Value}</div>
      </div>
    );
  };

  private _renderList(items: any): JSX.Element {
    const { job } = this.props;

    return (
      <div className="job-details-panel">
        <List
          items={items}
          getPageHeight={this._getPageHeight}
          onRenderCell={this._onRenderCell}
        />
      </div>
    );
  }

  render() {
    const { job } = this.props;
    const { currentTab } = this.state;
    const jobName = job ? job.Name : '–';
    const dueDate = Moment(job.DueDate).format('l');
    const account = job.Account ? job.Account.Name : '–';
    const jobType = job.Type ? job.Type.Name : '–';
    const jobDesc = job ? job.Description : '–';
    const tasks = job.Tasks ? job.Tasks : [];
    let generalActive = currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive = currentTab === 'attachments' ? 'active' : '';
    let tasksActive = currentTab === 'tasks' ? 'active' : '';

    const items = job
      ? [
          { 'Job Name': jobName } as IListItem,
          { Customer: account } as IListItem,
          { 'Job Type': jobType } as IListItem,
          { 'Job Description': jobDesc } as IListItem,
          { 'Job Due Date': dueDate } as IListItem,
        ]
      : ([] as IListItem[]);

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
              {this._renderList(items)}
            </div>
            <div className={'attachments ' + attachmentsActive}>
              {this._renderAttachments()}
            </div>
            <div className={'tasks ' + tasksActive}>
              {this._renderList(tasks)}
            </div>
          </div>
        </div>
        <div className={'job-detail-comments'}>
          <h5>Comments</h5>
          <div className="job-detail-comments-list">
            {this._renderList(tasks)}
          </div>
        </div>
      </div>
    );
  }
}
