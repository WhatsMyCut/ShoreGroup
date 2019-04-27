import React, { Component } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IAttachmentModel } from '../../models/IAttachmentModel';
import Moment from 'moment';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export interface IAttachmentListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export interface IDocument {
  name: string;
  value: string;
  iconName: string;
  modifiedBy?: string;
  modifiedOn: string;
  fileSize?: string;
}

interface IProps {
  attachments?: IAttachmentModel[];
}

export class AttachmentList extends Component<IProps, IAttachmentListState> {
  private _selection: Selection;
  setCurrentAttachment: string;
  state: {
    items: IDocument[];
    columns: IColumn[];
    selectionDetails: string;
    isModalSelection: false;
    isCompactMode: false;
    attachments?: IAttachmentModel[];
  };

  constructor(props: IProps) {
    super(props);
    const { attachments } = props;
    const _columns: IColumn[] = [
      {
        key: 'column1',
        name: 'File Type',
        className: 'file-icon-cell',
        iconClassName: 'file-icon-header-icon',
        ariaLabel:
          'Column operations for File type, Press to sort on File type',
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'name',
        minWidth: 20,
        maxWidth: 20,
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <Icon iconName={item.iconName} style={{ fontSize: 18 }} />;
        },
      },
      {
        key: 'column2',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Date Modified',
        fieldName: 'dateModifiedValue',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
        onRender: (item: IDocument) => {
          return <span>{item.modifiedOn}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Modified By',
        fieldName: 'modifiedBy',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'File Size',
        fieldName: 'fileSizeRaw',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IDocument) => {
          return <span>{item.fileSize}</span>;
        },
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: [] as IDocument[],
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: false,
      attachments: attachments,
    };
  }

  componentDidMount() {}

  public render() {
    const {
      columns,
      items,
      isCompactMode,
      selectionDetails,
      isModalSelection,
    } = this.state;
    const { attachments } = this.props;
    const rows = _generateDocuments(attachments);
    return (
      <div className="attachment-list-conttainer">
        <div className={'selection-details'}>{selectionDetails}</div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={rows}
            compact={isCompactMode}
            columns={columns}
            selectionMode={
              isModalSelection ? SelectionMode.multiple : SelectionMode.none
            }
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentDidUpdate(
    previousProps: any,
    previousState: IAttachmentListState,
  ) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return (
          '1 item selected: ' +
          (this._selection.getSelection()[0] as IDocument).name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (
    ev: React.MouseEvent<HTMLElement>,
    column: IColumn,
  ): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(
      currCol => column.key === currCol.key,
    )[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(
      items,
      currColumn.fieldName!,
      currColumn.isSortedDescending,
    );
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}
function _copyAndSort<T>(
  items: T[],
  columnKey: string,
  isSortedDescending?: boolean,
): T[] {
  const key = columnKey as keyof T;
  return items
    .slice(0)
    .sort((a: T, b: T) =>
      (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1,
    );
}

function _getFileIcon(
  attachment: IAttachmentModel,
): { iconName: string; url: string } {
  const dType: string =
    attachment && attachment.Type ? attachment.Type.Name : 'TextDocument';
  const type = dType === 'Proof' ? 'DocumentApproval' : dType;
  return {
    iconName: type,
    url: `javascript:void(0)`,
  };
}

const FILE_ICONS: { name: string }[] = [
  { name: 'accdb' },
  { name: 'csv' },
  { name: 'docx' },
  { name: 'dotx' },
  { name: 'mpt' },
  { name: 'odt' },
  { name: 'one' },
  { name: 'onepkg' },
  { name: 'onetoc' },
  { name: 'pptx' },
  { name: 'pub' },
  { name: 'vsdx' },
  { name: 'xls' },
  { name: 'xlsx' },
  { name: 'xsn' },
];

function _generateDocuments(attachments: IAttachmentModel[]) {
  console.log('Mapping', attachments);
  const items: IDocument[] = [];
  const rows = attachments ? attachments : [];
  rows.map((attachment: IAttachmentModel) => {
    const modifiedOn = Moment(attachment.ModifiedOn).format('l');
    const fileSize = attachment.Type ? attachment.Type.Value + 'kb' : '–';
    const fileType = _getFileIcon(attachment);
    let fileName = attachment.Name ? attachment.Name : '–';
    let userName = '[PLACEHOLDER]';
    items.push({
      name: fileName,
      value: fileName,
      iconName: fileType.iconName,
      modifiedBy: userName,
      modifiedOn: modifiedOn,
      fileSize: fileSize,
    });
  });
  return items;
}
