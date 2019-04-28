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
}

export interface IProps {
  attachment?: IAttachmentModel;
}

export class AttachmentPane extends Component<IProps, {}> {
  private _items: IAttachmnetPaneItem[];

  constructor(props: IProps) {
    super(props);

    const colors = [
      '#eaeaea',
      '#dadada',
      '#d0d0d0',
      '#c8c8c8',
      '#a6a6a6',
      '#c7e0f4',
      '#71afe5',
      '#eff6fc',
      '#deecf9',
    ];
    this._items = [];
    // Using splice prevents the colors from being duplicated
    const { attachment } = this.props;
    console.log('THERE', attachment);
    for (let i = 0; i < 5; i++) {
      if (attachment) {
        this._items.push({
          color: colors.splice(Math.floor(Math.random() * colors.length), 1)[0],
          Id: attachment.Id,
          Name: attachment.Name,
        });
      }
    }
  }

  public render() {
    const contentAreas = this._items.map(this._createContentArea);
    const { attachment } = this.props;
    const name = attachment ? attachment.Name : '–';
    return (
      <div className={'attachment-panel-container'}>
        <h4>{name}</h4>
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
