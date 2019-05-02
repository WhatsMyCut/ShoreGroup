import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel, IJobType } from '../../models/IJobModel';
import { AttachmentList } from '../../components/attachments/AttachmentList';
import { AttachmentPane } from '../../components/attachments/AttachmentPane';
import { TaskList } from '../../components/tasks/TaskList';
import { TaskPane } from '../tasks/TaskPane';
import { Dropzone } from '../shared/DropZone';
import Moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { List } from 'office-ui-fabric-react/lib/components/List';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { mergeStyleSets } from '@uifabric/styling';
import { ITaskModel } from '../../models/ITaskModel';

export interface IProps {
  disabled?: boolean;
  checked?: boolean;
  job: IJobModel;
  currentTab?: string;
  theme?: ITheme;
}
export interface IListItem {
  Name?: string;
  Value?: string;
}
export interface IState {
  currentTab?: string;
  currentAttachment?: any;
  currentTask?: any;
}
export const State: IState = {
  currentTab: 'general',
  currentAttachment: null,
  currentTask: null,
};
export default class JobDetail extends Component<IProps, IState> {
  protected theme: ITheme;
  protected classNames: any;
  constructor(props: IProps, state: IState) {
    super(props);
    this.theme = props.theme;
    this.state = state;
    window.onresize = () => this.render();
  }

  componentWillMount() {
    this.getHash();
    this.classNames = mergeStyleSets({
      jobDetailList: {
        width: '100%',
        fontSize: 'medium',
      },
      jobDetailRow: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '100%',
        flexDirection: 'row',
        width: '100%',
        borderBottom: '1px solid ' + this.theme.palette.themeLighter,
      },
      jobDetailKey: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '40%',
        backgroundColor: this.theme.palette.themeLighter,
        color: this.theme.palette.black,
        padding: 10,
        fontWeight: 'bolder',
        textShadow:
          '2px 2px 2px ' +
          this.theme.palette.themeDark +
          ' -1px -1px 2px ' +
          this.theme.palette.themeDarkAlt,
      },
      jobDetailValue: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: '60%',
        padding: 10,
        fontWeight: 'normal',
      },
    });
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
    this.setState({
      currentTab: h,
      currentAttachment: null,
      currentTask: null,
    });
  };

  _setCurrentAttachment = (attachment: string) => {
    const { job } = this.props;
    const IAttachment = job
      ? job.Attachments.filter(att => attachment === att.Id)
      : null;
    console.log('_setCurrentAttachment', IAttachment);
    this.setState({ currentAttachment: IAttachment });
    return this.state;
  };

  _setCurrentTask = () => {
    const { job } = this.props;
    const task = job ? job.Tasks.filter(task => task.Id === task.Id) : null;
    console.log('_setCurrentTask', task);
    this.setState({ currentTask: task });
    return this.state;
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

  private _renderAttachments() {
    const { job } = this.props;
    return !job ? (
      <div className="attachments-container" />
    ) : (
      <div className="attachments-container">
        <div className="attachments-dropzone">
          <Dropzone theme={this.theme}>
            <Icon
              iconName="FileUpload"
              style={{ color: this.theme.palette.themePrimary }}
            />
          </Dropzone>
        </div>
        <AttachmentList
          attachments={this.props.job.Attachments}
          onSelectRow={this._setCurrentAttachment}
        />
      </div>
    );
  }

  private _renderTasks() {
    const { job } = this.props;
    return !job ? (
      <div className="tasks-container" />
    ) : (
      <div className="tasks-container">
        <TaskList
          tasks={this.props.job.Tasks}
          onSelectRow={this._setCurrentTask}
        />
      </div>
    );
  }

  private _renderSidePanel() {
    let content;
    const { currentAttachment, currentTask } = this.state;
    const { job } = this.props;
    if (currentAttachment) {
      content = (
        <div>
          <AttachmentPane
            attachment={currentAttachment[0]}
            closeAttachmentPanel={() => {
              console.log('closePanel', currentAttachment);
              this.setState({ currentAttachment: null });
            }}
          />
        </div>
      );
    } else if (currentTask) {
      content = (
        <div>
          <TaskPane
            task={currentTask[0]}
            closeTaskPanel={() => {
              console.log('closePanel', currentTask);
              this.setState({ currentTask: null });
            }}
          />
        </div>
      );
    } else {
      content = <div>Comments</div>;
    }
    return <div className={'job-side-panel'}>{content}</div>;
  }

  private _getPageHeight(idx: number): number {
    return 50;
  }

  _closeAttachmentPanel(state) {
    const { currentAttachment } = this.state;
    console.log('_closeAttachmentPanel', currentAttachment);
    this.setState(state);
    return this.state;
  }

  private _renderList(): JSX.Element {
    const { job } = this.props;
    const columns = [
      {
        key: 'column1',
        name: '',
        fieldName: 'fieldName',
        minWidth: 100,
        maxWidth: 150,
        isResizable: false,
      },
      {
        key: 'column2',
        name: '',
        fieldName: 'fieldValue',
        minWidth: 200,
        maxWidth: 200,
        isResizable: false,
      },
    ];
    const jobName = job ? job.Name : '–';
    const dueDate = Moment(job.DueDate).format('l');
    const account = job.Account ? job.Account.Name : '–';
    const jobType = job.Type ? job.Type.Name : '–';
    const jobDesc = job ? job.Description : '–';
    const items = [
      { name: 'Job Name', value: jobName },
      { name: 'Customer', value: account },
      { name: 'Job Type', value: jobType },
      { name: 'Job Description', value: jobDesc },
      { name: 'Job Due Date', value: dueDate },
    ];
    return (
      <List
        items={items}
        className={this.classNames.jobDetailList}
        onRenderCell={(item, itemProps) => {
          return (
            <div className={this.classNames.jobDetailRow}>
              <div className={this.classNames.jobDetailKey}>{item.name}</div>
              <div className={this.classNames.jobDetailValue}>{item.value}</div>
            </div>
          );
        }}
      />
    );
  }

  render() {
    const { job } = this.props;
    const { currentTab } = this.state;
    const tasks = job.Tasks ? job.Tasks : [];
    let generalActive = currentTab === 'general' || '' ? 'active' : '';
    let attachmentsActive = currentTab === 'attachments' ? 'active' : '';
    let tasksActive = currentTab === 'tasks' ? 'active' : '';

    return (
      <div className="job-detail-container">
        <div className="job-detail-tabs">
          <CommandBar
            items={this.getItems()}
            theme={this.theme}
            styles={{
              root: {
                backgroundColor: '#f4f4f4',
              },
            }}
            //overflowItems={this.getOverlflowItems()}
            overflowButtonProps={{ ariaLabel: 'More commands' }}
            //farItems={this.getFarItems()}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
        </div>
        <div className="job-detail-content">
          <div className="job-detail-main">
            <div className="job-detail-panel">
              <div className={'general ' + generalActive}>
                {this._renderList()}
              </div>
              <div className={'attachments ' + attachmentsActive}>
                {this._renderAttachments()}
              </div>
              <div className={'tasks ' + tasksActive}>
                {this._renderTasks()}
              </div>
            </div>
          </div>
          <div className={'job-detail-comments'}>
            <div className="job-detail-comments-list">
              {this._renderSidePanel()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
