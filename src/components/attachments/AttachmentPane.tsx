import '../../styles/attachments.scss';
import React, { Component, ReactNode } from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IAttachmentModel, IFinishing } from '../../models/IAttachmentModel';
import { AttachmentIcon } from '../attachments/AttachmentIcon';
import Moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    minHeight: '40vh',
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
  closeAttachmentPanel?: any;
}

export class AttachmentPane extends Component<IProps, {}> {
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
      <div className="attachment-detail">
        <div className={'attachment-detail-header'}>{header}</div>
        <div className={'attachment-detail-options'}>
          <ul className="attachment-info-list">{content}</ul>
        </div>
      </div>
    );
  }

  private _getDetailContent(content: any, label: string) {
    const header = label ? label : '-';
    const name =
      typeof content === 'string'
        ? content
        : content && content.Name
        ? content.Name
        : '–';
    const value = content && content.Value ? content.Value : '-';
    return (
      <div className="attachment-detail">
        <div className={'attachment-detail-header'}>{header}</div>
        <div className={'attachment-detail-nvp'}>
          <div className="panel-list-key">{name}</div>
          <div className="panel-list-value">{value}</div>
        </div>
      </div>
    );
  }

  private _getAttachmentInfo(attachment: IAttachmentModel) {
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
      <div className="attachment-info">
        <ul className={'attachment-info-list'}>{content}</ul>
      </div>
    );
  }

  private _getAttachmentDetails(attachment: IAttachmentModel) {
    const bindingContent = this._getDetailContent(
      attachment.Binding,
      'Binding',
    );
    const colorContent = this._getDetailContent(attachment.Color, 'Color');
    const finishingContent = this._getListContent(
      attachment.Finishing,
      'Finishing',
    );
    const finishSizeContent = this._getDetailContent(
      attachment.FinishSize,
      'Finish Size',
    );
    const flatSizeContent = this._getDetailContent(
      attachment.FlatSize,
      'Flat Size',
    );
    const orientationContent = this._getDetailContent(
      attachment.Orientation,
      'Orientation',
    );
    const stockContent = this._getDetailContent(attachment.Stock, 'Stock');
    const pageCountContent = this._getDetailContent(
      attachment.PageCount,
      'Page Count',
    );
    const plusCoverStockContent = this._getDetailContent(
      attachment.PlusCoverStock,
      'Plus Cover Stock',
    );
    const simplexOrDuplexContent = this._getDetailContent(
      attachment.SimplexOrDuplex,
      'Simplex Or Duplex',
    );

    const vairablePageLengthContent = this._getDetailContent(
      attachment.VariablePageLength ? 'Yes' : 'No',
      'Variable Page Length',
    );

    const printReadyContent = this._getDetailContent(
      attachment.PrintReady ? 'Yes' : 'No',
      'Print Ready',
    );
    return (
      <div>
        <div>{bindingContent}</div>
        <div>{colorContent}</div>
        <div>{finishingContent}</div>
        <div>{finishSizeContent}</div>
        <div>{flatSizeContent}</div>
        <div>{orientationContent}</div>
        <div>{pageCountContent}</div>
        <div>{plusCoverStockContent}</div>
        <div>{printReadyContent}</div>
        <div>{simplexOrDuplexContent}</div>
        <div>{stockContent}</div>
        <div>{vairablePageLengthContent}</div>
      </div>
    );
  }

  private _getAttachmentIcon(attachment: IAttachmentModel) {
    return (
      <div>
        <AttachmentIcon attachment={attachment} />
      </div>
    );
  }

  private _gettAttachmentControls(attachment: IAttachmentModel) {
    const { closeAttachmentPanel } = this.props;
    console.log('HREHRER', closeAttachmentPanel);
    const editIcon = (
      <Icon
        iconName="EditSolid12"
        styles={{ root: { fontSize: 22, cursor: 'pointer' } }}
        onClick={() => console.log('Edit Attachment', attachment)}
        ariaLabel={'Edit Attachment'}
      />
    );
    const dowloadIcon = (
      <Icon
        iconName="FileDownload"
        styles={{ root: { fontSize: 22, bottom: 5, cursor: 'pointer' } }}
        onClick={() => console.log('Download Attachment', attachment.Url)}
      />
    );
    const closeIcon = (
      <Icon
        iconName="ChromeClose"
        styles={{ root: { fontSize: 14, cursor: 'pointer', padding: 5 } }}
        onClick={() => closeAttachmentPanel()}
      />
    );
    return (
      <div className={'attachment-control-container'}>
        <div>{editIcon}</div>
        <div>{dowloadIcon}</div>
        <div>{closeIcon}</div>
      </div>
    );
  }

  private _getAttachmentItems(attachment: IAttachmentModel) {
    let items = [];
    items.push(
      {
        color: '#f4f4f4',
        Id: '1',
        Name: <b>Attachment: "{attachment.Name}"</b>,
        data: this._getAttachmentIcon(attachment),
      },
      {
        color: '#efefef',
        Id: '1',
        Name: 'Attachment Info',
        data: this._getAttachmentInfo(attachment),
      },
      {
        color: '#f4f4f4',
        Id: '2',
        Name: 'Attachment Details',
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
    const controls = this._gettAttachmentControls(attachment);
    const contentAreas = items.map(this._createContentArea);
    return (
      <div className={'attachment-panel-container'}>
        <div className={'attachment-panel-controls'}>{controls}</div>
        <div className={classNames.wrapper}>
          <ScrollablePane styles={{ root: classNames.pane }}>
            {contentAreas}
          </ScrollablePane>
        </div>
        <div className="smalltext">Id: {attachment.Id}</div>
      </div>
    );
  }

  private _createContentArea = (item: IAttachmnetPaneItem, index: number) => {
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
