import '../../styles/attachments.scss';
import React, { Component, MouseEvent } from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IAttachmentModel } from '../../models/IAttachmentModel';
import { AttachmentIcon } from '../attachments/AttachmentIcon';
import Moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import {
  CommandBar,
  ICommandBarItemProps,
} from 'office-ui-fabric-react/lib/CommandBar';

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
    padding: '3px 20px 5px 10px',
    fontSize: '13px',
    borderTop: '1px solid ' + theme.palette.themeSecondary,
  },
  textContent: {
    padding: '15px 10px',
  },

  commentsContainer: {
    borderTop: '1px solid ' + theme.palette.themeSecondary,
    padding: 10,
  },
});

interface IAttachmentPaneItem {
  color: string;
  Id: string;
  Name: string;
  data?: JSX.Element;
}

interface IProps {
  attachment?: IAttachmentModel;
  closeAttachmentPanel?: any;
}

interface IState {
  currentTab?: string;
}

export class AttachmentPane extends Component<IProps, IState> {
  private _items: IAttachmentPaneItem[];

  constructor(props: IProps) {
    super(props);
    // Using splice prevents the colors from being duplicated
    const { attachment } = this.props;
    this.state = {
      currentTab: 'Attachment',
    };
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
          </li>
        );
      });
    } else {
      content = <div className="panel-list-key">–</div>;
    }
    return (
      <div className={'attachment-detail'}>
        <div className={'attachment-detail-header'}>{header}</div>
        <div className={'attachment-detail-options'}>
          <ul className={'info-list'}>{content}</ul>
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
      <div className="attachment-detail">
        <div className={'attachment-detail-header'}>{header}</div>
        <div className={'attachment-detail-nvp'}>
          <div className="panel-list-key">{name}</div>
        </div>
      </div>
    );
  }

  private _getFileInfo(attachment: IAttachmentModel) {
    const name = attachment ? attachment.Name : '–';
    const createdOn = attachment
      ? Moment(attachment.CreatedOn).format('l')
      : '–';
    const modifiedOn = attachment
      ? Moment(attachment.ModifiedOn).format('l')
      : '–';
    const url =
      attachment && attachment.Url ? (
        <div>
          <Link to={attachment.Url} target={'_blank'}>
            <Icon
              iconName="FileDownload"
              styles={{ root: { fontSize: 14, bottom: 5, cursor: 'pointer' } }}
            />{' '}
            Click to Download
          </Link>
        </div>
      ) : (
        '–'
      );
    const details = [
      {
        key: 'Name',
        value: name,
      },
      {
        key: 'Created Date',
        value: createdOn,
      },
      {
        key: 'Modified Date',
        value: modifiedOn,
      },
      {
        key: 'Download',
        value: url,
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
      <div className={'attachment-info'}>
        <ul className={'info-list'}>{content}</ul>
      </div>
    );
  }

  private _getAttachmentDetails(attachment: IAttachmentModel) {
    const bindingContent = attachment
      ? this._getDetailContent(attachment.Binding, 'Binding')
      : '–';
    const colorContent = attachment
      ? this._getDetailContent(attachment.Color, 'Color')
      : '–';
    const finishingContent = attachment
      ? this._getListContent(attachment.Finishing, 'Finishing')
      : '–';
    const finishSizeContent = attachment
      ? this._getDetailContent(attachment.FinishSize, 'Finish Size')
      : '–';
    const flatSizeContent = attachment
      ? this._getDetailContent(attachment.FlatSize, 'Flat Size')
      : '–';
    const orientationContent = attachment
      ? this._getDetailContent(attachment.Orientation, 'Orientation')
      : '–';
    const stockContent = attachment
      ? this._getDetailContent(attachment.Stock, 'Stock')
      : '–';
    const pageCountContent = attachment
      ? this._getDetailContent(attachment.PageCount, 'Page Count')
      : '–';
    const plusCoverStockContent = attachment
      ? this._getDetailContent(attachment.PlusCoverStock, 'Plus Cover Stock')
      : '–';
    const simplexOrDuplexContent = attachment
      ? this._getDetailContent(attachment.SimplexOrDuplex, 'Simplex Or Duplex')
      : '–';
    const vairablePageLengthContent = attachment
      ? this._getDetailContent(
          attachment.VariablePageLength ? 'Yes' : 'No',
          'Variable Page Length',
        )
      : '–';
    const printReadyContent = attachment
      ? this._getDetailContent(
          attachment.PrintReady ? 'Yes' : 'No',
          'Print Ready',
        )
      : '–';
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

  private _getPanelSections(attachment: IAttachmentModel) {
    let items = [];
    const name = attachment ? attachment.Name : '_';
    items.push(
      {
        color: theme.palette.themeLighter,
        Id: '1',
        Name: (
          <div>
            <b>Attachment: "{name}"</b>
          </div>
        ),
        data: this._getAttachmentIcon(attachment),
      },
      {
        color: theme.palette.themeLight,
        Id: '2',
        Name: 'File Info',
        data: this._getFileInfo(attachment),
      },
      {
        color: theme.palette.themeLighterAlt,
        Id: '3',
        Name: 'Attachment Details',
        data: this._getAttachmentDetails(attachment),
      },
    );
    return items;
  }
  private _getItems(): ICommandBarItemProps[] {
    const { currentTab } = this.state;
    const { closeAttachmentPanel } = this.props;
    const attachmentClassName =
      currentTab && currentTab === 'Attachment' ? 'active' : '';
    const commentsClassName =
      currentTab && currentTab === 'Comments' ? 'active' : '';
    return [
      {
        key: '1',
        name: 'Attachment',
        className: attachmentClassName,
        iconProps: { iconName: 'ActivateOrders' },
        onClick: this._setPanelTab,
        style: {
          backgroundColor: 'transparent',
          borderRight: '1px solid ' + theme.palette.themeLight,
        },
      },
      {
        key: '2',
        name: 'Comments',
        className: commentsClassName,
        iconProps: { iconName: 'Comment' },
        onClick: this._setPanelTab,
        style: {
          backgroundColor: 'transparent',
          borderRight: '1px solid ' + theme.palette.themeLight,
        },
      },
      {
        key: 'close',
        iconOnly: true,
        iconProps: { iconName: 'ChromeClose', style: { fontSize: 12 } },
        onClick: closeAttachmentPanel,
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
        : 'Attachment';
    console.log('setPanel', currentTab);
    this.setState({ currentTab });
  };
  private _renderComments() {
    return (
      <div className={classNames.commentsContainer}>Attachment Comments</div>
    );
  }

  render() {
    const { attachment } = this.props;
    const { currentTab } = this.state;
    let content;
    if (currentTab === 'Comments') {
      content = this._renderComments();
    } else {
      const items = this._getPanelSections(attachment);
      const contentAreas = items.map(this._createContentArea);
      content = (
        <ScrollablePane styles={{ root: classNames.pane }}>
          {contentAreas}
        </ScrollablePane>
      );
    }
    const attId = attachment ? attachment.Id : '–';
    return (
      <div className={'attachment-panel-container'}>
        <CommandBar
          items={this._getItems()}
          theme={theme}
          styles={{
            root: {
              padding: 0,
              margin: 0,
              backgroundColor: 'transparent',
            },
          }}
        />
        <div className={classNames.wrapper}>{content}</div>
        <div className="smalltext">Id: {attId}</div>
      </div>
    );
  }

  private _createContentArea = (item: IAttachmentPaneItem, index: number) => {
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
