import React, { Component, ReactNode } from 'react';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from 'office-ui-fabric-react/lib/Sticky';
import { getTheme, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IAttachmentModel } from '../../models/IAttachmentModel';

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
  data: any;
}

export interface IProps {
  attachment?: IAttachmentModel;
}

export class AttachmentPane extends Component<
  IProps,
  {
    items: any;
    attachment: any;
  }
> {
  private _items: IAttachmnetPaneItem[];

  constructor(props: IProps) {
    super(props);

    const colors = ['#efefef', '#f4f4f4', '#ccc'];
    this._items = [];
    // Using splice prevents the colors from being duplicated
    const { attachment } = this.props;
    console.log('THERE', attachment);
    this._items.push(
      {
        color: '#f4f4f4',
        Id: '1',
        Name: 'Attachment Details',
        data: attachment,
      },
      {
        color: '#ccc',
        Id: '2',
        Name: 'Finishing',
        data: {},
      },
    );
    for (let i = 0; i < 3; i++) {
      if (attachment) {
        this._items.push({
          color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
          Id: attachment.Id,
          Name: attachment.Name,
          data: {
            somedata: {
              var1: 'something',
            },
          },
        });
      }
    }
    this.state = {
      attachment: attachment,
      items: this._items,
    };
  }

  public render() {
    const { attachment } = this.props;
    const { items } = this.state;
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
    return (
      <div
        key={index}
        style={{
          backgroundColor: item.color,
        }}
      >
        <Sticky stickyPosition={StickyPositionType.Both}>
          <div className={classNames.sticky}>
            {item.Name} #{item.Id}
          </div>
        </Sticky>
        <div className={classNames.textContent}>{item.Name}</div>
      </div>
    );
  };
}
