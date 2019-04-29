import '../../styles/attachments.scss';
import React, { Component, ReactNode } from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IAttachmentModel, IFinishing } from '../../models/IAttachmentModel';
import Moment from 'moment';

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    height: '40vh',
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
});

export interface IAttachmnetPaneItem {
  color: string;
  Id: string;
  Name: string;
  data?: JSX.Element;
}

export interface IProps {
  attachment?: IAttachmentModel;
}

export class AttachmentPane extends Component<
  IProps,
  {
    attachment: any;
  }
> {
  private _items: IAttachmnetPaneItem[];

  constructor(props: IProps) {
    super(props);

    // Using splice prevents the colors from being duplicated
    const { attachment } = this.props;
    console.log('THERE', attachment);
    this.state = {
      attachment: attachment,
    };
  }

  private _getListContent(group: any[]) {
    let content;
    if (group.length) {
      content = group.map((x: IFinishing, i: number) => {
        return (
          <li key={i} className="panel-list-row">
            <div className="panel-row-name">{x.Name}</div>
            <div className="panel-row-value">{x.Value}</div>
          </li>
        );
      });
    } else {
      content = <div>No {typeof group} Options</div>;
    }
    return (
      <div className={'panel-content'}>
        <div className={'panel-content-header'}>Finishing</div>
        <ul className="panel-content-list">{content}</ul>
      </div>
    );
  }

  private _getAttachmentInfo(attachment: IAttachmentModel) {
    const finishingContent = this._getListContent(attachment.Finishing);
    const details = [
      {
        key: 'Name',
        value: attachment.Name,
      },
      {
        key: 'Created Date',
        value: Moment(attachment.CreatedOn).format('l'),
      },
      {
        key: 'Modified Date',
        value: Moment(attachment.ModifiedOn).format('l'),
      },
      {
        key: 'Attachment Id',
        value: attachment.Id,
        className: 'smalltext',
      },
    ];
    const content = details.map(
      (item, index): JSX.Element => {
        return (
          <li
            key={index}
            className={
              'panel-list-row ' + (item.className ? item.className : '')
            }
          >
            <div className="panel-list-key">{item.key}</div>
            <div className="panel-list-value">{item.value}</div>
          </li>
        );
      },
    );
    return (
      <div className="attachment-info">
        <ul className={'attachment-info-list'}>{content}</ul>
      </div>
    );
  }

  private _getAttachmentDetails(attachment: IAttachmentModel) {
    const finishingContent = this._getListContent(attachment.Finishing);
    return (
      <div>
        <ul>
          <li>
            <div>Finishing</div>
            <div>{finishingContent}</div>
          </li>
        </ul>
      </div>
    );
  }

  private _getAttachmentIcon(attachment: IAttachmentModel) {
    return <div> Icon </div>;
  }

  private _getAttachmentItems(attachment: IAttachmentModel) {
    const colors = ['#efefef', '#f4f4f4', '#ccc'];
    let items = [];
    items.push(
      {
        color: '#f4f4f4',
        Id: '1',
        Name: <b>{attachment.Name}</b>,
        data: this._getAttachmentIcon(attachment),
      },
      {
        color: '#f4f4f4',
        Id: '1',
        Name: 'Attachment Info',
        data: this._getAttachmentInfo(attachment),
      },
      {
        color: '#ccc',
        Id: '2',
        Name: 'Details',
        data: this._getAttachmentDetails(attachment),
      },
    );
    // for (let i = 0; i < 3; i++) {
    //   if (attachment) {
    //     items.push({
    //       color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
    //       Id: attachment.Id,
    //       Name: attachment.Name,
    //     });
    //   }
    // }
    return items;
  }

  render() {
    const { attachment } = this.props;
    const items = this._getAttachmentItems(attachment);
    const name = attachment ? attachment.Name : '–';
    const contentAreas = items.map(this._createContentArea);
    return (
      <div className={'attachment-panel-container'}>
        <div style={{ height: 20, color: 'black' }}>{name}</div>
        <div className={classNames.wrapper}>
          <ScrollablePane styles={{ root: classNames.pane }}>
            {contentAreas}
          </ScrollablePane>
        </div>
      </div>
    );
  }

  private _createContentArea = (item: IAttachmnetPaneItem, index: number) => {
    //let rows = item.data ? item.data.map((key, val) => { val === null ? '' : <div key={index}>{key}: {val ? val : 'null'}</div>}) : '';
    console.log('_createContentArea', item);
    return (
      <div
        key={index}
        style={{
          backgroundColor: item.color,
        }}
      >
        <Sticky stickyPosition={StickyPositionType.Both}>
          <div className={classNames.sticky} key={item.Id}>
            {item.Name}
          </div>
        </Sticky>
        <div className={classNames.textContent}>{item.data}</div>
      </div>
    );
  };
}
