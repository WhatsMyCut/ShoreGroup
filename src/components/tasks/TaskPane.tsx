import '../../styles/attachments.scss';
import React, { Component, ReactNode } from 'react';
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
    border: '1px solid ' + theme.palette.neutralLight,
  },
  sticky: {
    color: theme.palette.neutralDark,
    padding: '5px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.black,
    borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: '15px 10px',
  },
  taskInfoList: {
    listStyleType: 'none',
    margin: 0,
    paddingVertical: 2,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
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

export class TaskPane extends Component<IProps, {}> {
  private _items: ITaskPaneItem[];

  constructor(props: IProps) {
    super(props);

    // Using splice prevents the colors from being duplicated
    const { task } = this.props;
    console.log('THERE', task);
  }
  componentWillUnmount() {}

  private _getListContent(group: any[], label: string) {
    const header = label ? label : '-';
    let content;
    if (group && group.length) {
      content = group.map((x: any, i: number) => {
        return (
          <li key={i} className="panel-list-row">
            <div className="panel-list-key">{x.Name}</div>
            <div className="panel-list-value">{x.Value}</div>
          </li>
        );
      });
    } else {
      content = <div className="panel-list-key">–</div>;
    }
    return (
      <div className={'task-detail'}>
        <div className={'task-detail-header'}>{header}</div>
        <div className={'task-detail-options'}>
          <ul className={'taskInfoList'}>{content}</ul>
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
      <div className="task-detail">
        <div className={'task-detail-header'}>{header}</div>
        <div className={'task-detail-nvp'}>
          <div className="panel-list-key">{name}</div>
          <div className="panel-list-value">{value}</div>
        </div>
      </div>
    );
  }

  private _getFileInfo(task: ITaskModel) {
    const name = task ? task.Subject : '–';
    const details = [
      {
        key: 'Name',
        value: name,
      },
    ];
    const content = details.map(
      (item, index): JSX.Element => {
        return (
          <li key={index} className={'panel-list-row '}>
            <div className="panel-list-key">{item.key}</div>
            <div className="panel-list-value">{item.value}</div>
          </li>
        );
      },
    );
    return (
      <div className="task-info">
        <ul className={'task-info-list'}>{content}</ul>
      </div>
    );
  }

  private _getTaskDetails(task: ITaskModel) {
    return (
      <div>
        <div>[placeholder]</div>
      </div>
    );
  }

  private _getTaskIcon(task: ITaskModel) {
    return <div>[Task Icon]</div>;
  }

  private _getCloseBtn() {
    const { task, closeTaskPanel } = this.props;
    return (
      <Icon
        iconName="ChromeClose"
        styles={{ root: { fontSize: 12, cursor: 'pointer', paddingRight: 0 } }}
        onClick={closeTaskPanel}
      />
    );
  }

  private _getPanelSections(task: ITaskModel) {
    let items = [];
    const name = task ? task.Subject : '_';
    items.push(
      {
        color: theme.palette.neutralLight,
        Id: '1',
        Name: (
          <div>
            <b>Task: "{name}"</b>
            <span className="close-btn">{this._getCloseBtn()}</span>
          </div>
        ),
        data: this._getTaskIcon(task),
      },
      {
        color: theme.palette.neutralLighter,
        Id: '2',
        Name: 'File Info',
        data: this._getFileInfo(task),
      },
      {
        color: theme.palette.neutralLighterAlt,
        Id: '3',
        Name: 'Task Details',
        data: this._getTaskDetails(task),
      },
    );
    return items;
  }

  render() {
    const { task } = this.props;
    const items = this._getPanelSections(task);
    const contentAreas = items.map(this._createContentArea);
    const attId = task ? task.Id : '–';
    return (
      <div className={'task-panel-container'}>
        <div className={classNames.wrapper}>
          <ScrollablePane styles={{ root: classNames.pane }}>
            {contentAreas}
          </ScrollablePane>
        </div>
        <div className="smalltext">Id: {attId}</div>
      </div>
    );
  }

  private _createContentArea = (item: ITaskPaneItem, index: number) => {
    //console.log('_createContentArea', item);
    return (
      <div
        key={index}
        style={{
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
