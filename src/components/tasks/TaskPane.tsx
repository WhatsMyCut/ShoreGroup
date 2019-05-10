import '../../styles/attachments.scss';
import React, { Component, MouseEvent } from 'react';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { ITaskModel } from '../../models/ITaskModel';
import Moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { BaseButton } from 'office-ui-fabric-react/lib/components/Button';

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    minHeight: '40vh',
    height: '100%',
    position: 'relative',
    maxHeight: 'inherit',
  },
  pane: {
    maxWidth: 400,
    border: '1px solid ' + theme.palette.themeLight,
  },
  sticky: {
    color: theme.palette.themeDark,
    padding: '0 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
  taskDetail: {
    display: 'flex',
    flexDirection: 'row',
  },

  taskDetailHeader: {
    flex: '1 1 30%',
    fontWeight: 'bold',
    paddingRight: 5,
  },
  taskDetailOptions: {
    flex: '1 1 60%',
  },
  taskDetailNVP: {
    display: 'flex',
    flex: '1 1 60%',
    borderBottom: '1px solid' + theme.palette.themeLighter,
    selectors: {
      '& > div:first-of-type': {
        flex: '1 0 60%',
      },
    },
  },
  taskInfo: {
    padding: 0,
    selectors: {
      '& ul': {
        listStyleType: 'none !important',
        paddingLeft: '0 !important',
      },
    },
  },
  taskInfoList: {
    paddingVertical: 2,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
    selectors: {
      '& li': {
        display: 'flex',
        listStyleType: 'none',
      },
      '& li div:first-of-type': {
        borderBottomColor: 'transparent',
      },
      '& li div:last-of-type': {
        borderBottom: '1px solid' + theme.palette.themeDarkAlt,
      },
    },
  },

  panelListKey: {
    flex: '0 0 35%',
    fontWeight: 'bold',
    borderBottom: '1px solid' + theme.palette.themeDarkAlt,
  },

  panelListValue: {
    flex: '1 1 auto',
    borderBottom: '1px solid' + theme.palette.themeDarkAlt,
  },

  panelListRow: {
    margin: '2px 0',
  },
});

export interface ITaskPaneItem {
  color: string;
  Id: string;
  Name: string;
  data?: JSX.Element;
}

export interface IProps {
  task?: ITaskModel;
  closeTaskPanel?: any;
}

interface IState {
  currentTab?: string;
}

export class TaskPane extends Component<IProps, IState> {
  private _items: ITaskPaneItem[];

  constructor(props: IProps) {
    super(props);

    // Using splice prevents the colors from being duplicated
    const { task } = this.props;
    this.state = {
      currentTab: 'Task',
    };
    console.log('THERE', task);
  }
  componentWillUnmount() {}

  _getListContent(group: any[], label: string) {
    const header = label ? label : '-';
    let content;
    if (group && group.length) {
      content = group.map((x: any, i: number) => {
        return (
          <li key={i} className={classNames.panelListRow}>
            <div className={classNames.panelListKey}>{x.Name}</div>
            <div className={classNames.panelListValue}>{x.Value}</div>
          </li>
        );
      });
    } else {
      content = <div className={classNames.panelListKey}>–</div>;
    }
    return (
      <div className={classNames.taskDetail}>
        <div className={classNames.taskDetailHeader}>{header}</div>
        <div className={classNames.taskDetailOptions}>
          <ul className={classNames.taskInfoList}>{content}</ul>
        </div>
      </div>
    );
  }

  private _getDetailContent(content: any, label?: string) {
    const header = label ? label : '-';
    const name =
      typeof content === 'string'
        ? content
        : content && content.Name
        ? content.Name
        : '–';
    const value = content && content.Value ? content.Value : '-';
    return (
      <div className={classNames.taskDetail}>
        <div className={classNames.taskDetailHeader}>{header}</div>
        <div className={classNames.taskDetailNVP}>
          <div className={classNames.panelListKey}>{name}</div>
          <div className={classNames.panelListValue}>{value}</div>
        </div>
      </div>
    );
  }

  private _getFileInfo(task: ITaskModel) {
    const name = task ? task.Subject : '–';
    const taskNo = task ? task.TaskNumber : '–';
    const type = task && task.Type ? task.Type.Name : '–';
    const modified = task ? Moment(task.ModifiedOn).format('l') : '–';
    const dueDate = task ? Moment(task.DueDate).format('l') : '–';
    const details = [
      {
        key: 'Name',
        value: name,
      },
      {
        key: 'Task Number',
        value: taskNo,
      },
      {
        key: 'Type',
        value: type,
      },
      {
        key: 'Modified Date',
        value: modified,
      },
      {
        key: 'Due Date',
        value: dueDate,
      },
    ];
    const content = details.map(
      (item, index): JSX.Element => {
        return (
          <li key={index} className={classNames.panelListRow}>
            <div className={classNames.panelListKey}>{item.key}</div>
            <div className={classNames.panelListValue}>{item.value}</div>
          </li>
        );
      },
    );
    return (
      <div className={classNames.taskInfo}>
        <ul className={classNames.taskInfoList}>{content}</ul>
      </div>
    );
  }

  private _getTaskDetails(task: ITaskModel) {
    const attachmentContent = task
      ? this._getDetailContent(task.Attachment, 'Attachment')
      : '–';
    const cassContent = task ? this._getDetailContent(task.CASS, 'CASS') : '–';
    const cassInstructionContent = task
      ? this._getDetailContent(task.CASSInstructions, 'CASS Instructions')
      : '–';
    const dedupeContent = task
      ? this._getDetailContent(task.Dedupe, 'Dedupe')
      : '–';
    const fedExAccountContent = task
      ? this._getDetailContent(task.FedexAccount, 'FedEx Account')
      : '–';
    const householdContent = task
      ? this._getDetailContent(task.Household, 'Household')
      : '–';
    const householdInstContent = task
      ? this._getDetailContent(
          task.HouseholdInstructions,
          'Household Instructions',
        )
      : '–';
    const ncoaContent = task ? this._getDetailContent(task.NCOA, 'NCOA') : '–';
    const ncoaInstContent = task
      ? this._getDetailContent(task.NCOAInstructions, 'NCOA Instructions')
      : '–';
    const presortContent = task
      ? this._getDetailContent(task.Presort, 'Presort')
      : '–';
    const priorityContent = task
      ? this._getDetailContent(task.Priority, 'Priority')
      : '–';
    const proofInstContent = task
      ? this._getDetailContent(task.ProofInstructions, 'Proof Instructions')
      : '–';
    const proofTypeContent = task
      ? this._getDetailContent(task.ProofType, 'Proof Type')
      : '–';
    const spotColorMatchContent = task
      ? this._getDetailContent(task.SpotColorMatch, 'Spot Color Match')
      : '–';
    const spotColorInstContent = task
      ? this._getDetailContent(
          task.SpotColorMatchInstructions,
          'SCM Instructions',
        )
      : '–';
    const upsContent = task
      ? this._getDetailContent(task.UPSAccount, 'UPS Account')
      : '–';
    const uspsContent = task
      ? this._getDetailContent(task.USPSAccount, 'USPS Account')
      : '–';
    const vprogContent = task
      ? this._getDetailContent(task.VariableProgramming, 'Variable Programming')
      : '–';
    const vprogInstContent = task
      ? this._getDetailContent(
          task.VariableProgrammingInstructions,
          'Variable Programming Instructions',
        )
      : '–';
    return (
      <div>
        <div>{attachmentContent}</div>
        <div>{cassContent}</div>
        <div>{cassInstructionContent}</div>
        <div>{dedupeContent}</div>
        <div>{fedExAccountContent}</div>
        <div>{householdContent}</div>
        <div>{householdInstContent}</div>
        <div>{ncoaContent}</div>
        <div>{ncoaInstContent}</div>
        <div>{presortContent}</div>
        <div>{priorityContent}</div>
        <div>{proofInstContent}</div>
        <div>{proofTypeContent}</div>
        <div>{spotColorMatchContent}</div>
        <div>{spotColorInstContent}</div>
        <div>{upsContent}</div>
        <div>{uspsContent}</div>
        <div>{vprogContent}</div>
        <div>{vprogInstContent}</div>
      </div>
    );
  }

  private _getPanelSections(task: ITaskModel) {
    let items = [];
    const name = task ? task.Subject : '_';
    items.push(
      {
        color: theme.palette.themeLighter,
        Id: '2',
        Name: (
          <div>
            <b>Task: "{name}"</b>
          </div>
        ),
        data: this._getFileInfo(task),
      },
      {
        color: theme.palette.themeLight,
        Id: '1',
        Name: 'Task Details',
        data: this._getTaskDetails(task),
      },
    );
    return items;
  }

  render() {
    const { task } = this.props;
    const { currentTab } = this.state;
    let content;
    if (currentTab === 'Comments') {
      content = this._renderComments();
    } else {
      const items = this._getPanelSections(task);
      const contentAreas = items.map(this._createContentArea);
      content = (
        <ScrollablePane styles={{ root: classNames.pane }}>
          {contentAreas}
        </ScrollablePane>
      );
    }
    const attId = task ? task.Id : '–';
    return (
      <div className={'task-panel-container'}>
        <CommandBar
          items={this._getItems()}
          theme={theme}
          styles={{
            root: {
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent',
              button: {
                padding: 0,
                margin: 0,
                border: '1px solid ' + theme.palette.themePrimary,
              },
            },
          }}
        />

        <div className={classNames.wrapper}>{content}</div>
        <div className="smalltext">Id: {attId}</div>
      </div>
    );
  }
  private _renderComments() {
    return <div> Task Comments </div>;
  }
  _getItems(): ICommandBarItemProps[] {
    const { currentTab } = this.state;
    const { closeTaskPanel } = this.props;
    const taskClassName = currentTab && currentTab === 'Task' ? 'active' : '';
    const commentsClassName =
      currentTab && currentTab === 'Comments' ? 'active' : '';
    return [
      {
        key: '1',
        name: 'Task',
        className: taskClassName,
        iconProps: { iconName: 'ActivateOrders' },
        onClick: this._setPanelTab,
      },
      {
        key: '2',
        name: 'Comments',
        className: commentsClassName,
        iconProps: { iconName: 'Comment' },
        onClick: this._setPanelTab,
      },
      {
        key: 'close',
        iconOnly: true,
        iconProps: { iconName: 'ChromeClose', style: { fontSize: 12 } },
        onClick: closeTaskPanel,
        style: {
          position: 'absolute',
          right: 0,
          backgroundColor: 'transparent',
          cursor: 'pointer',
        },
      },
    ];
  }
  protected _setPanelTab = (ev: MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    const currentTab =
      ev && ev.currentTarget
        ? ev.currentTarget.innerText.substr(1).trim()
        : 'Task';
    console.log('setPanel', currentTab);
    this.setState({ currentTab });
  };

  private _createContentArea = (item: ITaskPaneItem, index: number) => {
    //console.log('_createContentArea', item);
    return (
      <div
        key={index}
        style={{
          flex: '1 1 100%',
          backgroundColor: item.color,
        }}
      >
        <Sticky stickyPosition={StickyPositionType.Both}>
          <div className={classNames.sticky} key={item.Id}>
            <b>{item.Name}</b>
          </div>
        </Sticky>
        <div className={classNames.textContent}>{item.data}</div>
      </div>
    );
  };
}
