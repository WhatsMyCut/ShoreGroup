import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as JobStore from '../../store/JobStore';
import { ApplicationState, reducers } from '../../store/index';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IJobModel } from '../../models/IJobModel';
import { AttachmentList } from '../../components/attachments/AttachmentList';
import { AttachmentPane } from '../../components/attachments/AttachmentPane';
import { TaskList } from '../../components/tasks/TaskList';
import { TaskPane } from '../tasks/TaskPane';
import { CommentsPane } from '../comments/CommentsPane';
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
  job?: IJobModel;
}
export const State: IState = {
  currentTab: 'general',
  currentAttachment: null,
  currentTask: null,
  job: null,
};
class JobDetail extends Component<IProps, IState> {
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
        flexBasis: '25%',
        backgroundColor: this.theme.palette.themeLighter,
        color: this.theme.palette.black,
        borderBottom: '1px solid ' + this.theme.palette.themeLight,
        borderRight: '1px solid ' + this.theme.palette.themeLight,
        padding: 10,
        fontSize: 12,
        selectors: {
          '&:last-child': {
            borderBottom: 'transparent',
          },
        },
      },
      jobDetailValue: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: '75%',
        padding: 10,
      },
      jobDetailContainer: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '100%',
        flexDirection: 'column',
      },
      jobDetailTabs: {
        marginBottom: 15,
        border: '1px solid' + this.theme.palette.themePrimary,
        borderRadius: 5,
        backgroundColor: this.theme.palette.themeLighter,
        selectors: {
          '& .ms-CommandBar': {
            padding: 0,
            paddingLeft: 5,
            backgroundColor: 'transparent',
          },
          '& .ms-CommandBar .ms-Button': {
            backgroundColor: 'transparent',
          },
        },
      },
      active: {
        borderBottom: '3px solid' + this.theme.palette.themePrimary,
      },
      jobDetailMain: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '100%',
        flexDirection: 'row',
        border: '1px solid' + this.theme.palette.themePrimary,
        borderRadius: 5,
        padding: 0,
      },
      jobDetailComments: {
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: '30%',
        margin: '0 0 0 25px',
        border: '1px solid' + this.theme.palette.themePrimary,
        borderRadius: 5,
        padding: '0',
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
        className: hash === 'general' || '' ? this.classNames.active : '',
        iconProps: {
          iconName: 'BulletedList',
        },
        ariaLabel: 'General',
        onClick: () => this.setHash('general'),
      },
      {
        key: 'attachments',
        name: 'Attachments',
        className: hash === 'attachments' ? this.classNames.active : '',
        iconProps: {
          iconName: 'FilePDB',
        },
        ['data-automation-id']: 'uploadButton',
        onClick: () => this.setHash('attachments'),
      },
      {
        key: 'share',
        name: 'Tasks',
        className: hash === 'tasks' ? this.classNames.active : '',
        iconProps: {
          iconName: 'ActivateOrders',
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
    const jobId = job ? job.Id : '0';
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
      content = (
        <div>
          <CommentsPane job={job} />
        </div>
      );
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
    const jobNumber = job && job.JobName ? job.JobName : '–';
    const dueDate = Moment(job.DueDate).format('l');
    const account = job && job.Account ? job.Account.name : '–';
    const owner = job && job.Owner ? job.Owner.FullName : '–';
    const jobType = job && job.Type ? job.Type.Name : '–';
    const jobDesc = job ? job.Description : '–';
    const items = [
      { name: 'Job Name', value: jobName },
      { name: 'Job Number', value: jobNumber },
      { name: 'Job Description', value: jobDesc },
      { name: 'Job Type', value: jobType },
      { name: 'Job Due Date', value: dueDate },
      { name: 'Customer Owner', value: account },
      { name: 'Sepire Owner', value: owner },
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
      <div className={this.classNames.jobDetailContainer}>
        <div className={this.classNames.jobDetailTabs}>
          <CommandBar
            items={this.getItems()}
            theme={this.theme}
            styles={{
              root: {
                backgroundColor: this.theme.palette.themeLight,
              },
            }}
            ariaLabel={
              'Use left and right arrow keys to navigate between commands'
            }
          />
        </div>
        <div className="job-detail-content">
          <div className={this.classNames.jobDetailMain}>
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
          <div className={this.classNames.jobDetailComments}>
            <div className="job-detail-comments-list">
              {this._renderSidePanel()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.job,
  JobStore.actionCreators,
)(JobDetail as any);

export default (withRouter(component as any) as any) as typeof JobDetail;
