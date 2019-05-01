import '../../styles/jobs.scss';
import React, { Component, MouseEvent } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IJobModel, formatStatusLabel } from '../../models/IJobModel';
import { NavLink } from 'react-router-dom';
import { Checkbox } from 'office-ui-fabric-react';
import JobActions from '../../components/jobs/JobActions';
import Moment from 'moment';

export interface IProps {
  items: IJobModel[];
}

export interface IJobsListState {
  columns: IColumn[];
  items: IJobModel[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export default class JobList extends Component<IProps, IJobsListState> {
  private _selection: Selection;
  private _allItems: IJobModel[];

  constructor(props: IProps) {
    super(props);
    const columns: IColumn[] = [
      {
        key: 'column1',
        name: '',
        className: 'checkbox-cell',
        iconClassName: 'file-icon-img',
        ariaLabel:
          'Column operations for File type, Press to sort on File type',
        iconName: 'Checkbox',
        isIconOnly: true,
        fieldName: 'id',
        minWidth: 30,
        maxWidth: 30,
        //onColumnClick: this._onColumnClick,
        onRender: (item: IJobModel) => {
          return (
            <span>
              <Checkbox id={item.Id} styles={{ checkbox: { fontSize: 22 } }} />
            </span>
          );
        },
      },
      {
        key: 'column2',
        name: 'Job Number',
        fieldName: 'JobNumber',
        minWidth: 100,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IJobModel) => {
          return (
            <NavLink to={`/jobs/${item.Id}`} data-automation-id="test">
              J-{item.JobName}
            </NavLink>
          );
        },
      },
      {
        key: 'column3',
        name: 'Job Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 180,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IJobModel) => {
          return (
            <NavLink to={`/jobs/${item.Id}`} data-automation-id="test">
              {item.Name}
            </NavLink>
          );
        },
      },
      {
        key: 'column4',
        name: 'Client Owner',
        fieldName: 'clientOwner',
        minWidth: 70,
        maxWidth: 150,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IJobModel) => {
          return <span>{item.Account ? item.Account.Name : 'n/a'}</span>;
        },
      },
      {
        key: 'column5',
        name: 'Sepire Owner',
        fieldName: 'sepireOwner',
        minWidth: 70,
        maxWidth: 150,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IJobModel) => {
          return <span>{item.Owner ? item.Owner.FullName : 'n/a'}</span>;
        },
      },
      {
        key: 'column6',
        name: 'Type',
        fieldName: 'item.Type',
        minWidth: 70,
        maxWidth: 70,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'string',
        onRender: (item: IJobModel) => {
          const jobType = item.Type ? item.Type.Name : 'n/a';
          return <span>{jobType}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column7',
        name: 'Created Date',
        fieldName: 'createdOn',
        minWidth: 70,
        maxWidth: 70,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'date',
        onRender: (item: IJobModel) => {
          return <span>{Moment(item.CreatedOn).format('l')}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column8',
        name: 'Due Date',
        fieldName: 'dueDate',
        minWidth: 70,
        maxWidth: 70,
        isResizable: true,
        isCollapsible: true,
        data: 'date',
        onColumnClick: this._onColumnClick,
        onRender: (item: IJobModel) => {
          return <span>{Moment(item.DueDate).format('l')}</span>;
        },
        isPadded: true,
      },
      {
        key: 'column9',
        name: 'Status',
        fieldName: 'statusReason.label',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IJobModel) => {
          const statusClassName = formatStatusLabel(item.StatusReason.Label);
          return (
            <span className={statusClassName}>{item.StatusReason.Label}</span>
          );
        },
      },
      {
        key: 'column10',
        name: '',
        minWidth: 30,
        maxWidth: 30,
        isResizable: true,
        isCollapsible: true,
        onColumnClick: noOp(),
        onRender: (item: IJobModel) => {
          return <JobActions job={item} />;
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
      items: props.items,
      columns: columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: true,
    };
  }

  alertClicked(e: MouseEvent) {
    console.log('alertClicked', e);
  }

  render() {
    const {
      columns,
      isCompactMode,
      selectionDetails,
      isModalSelection,
    } = this.state;
    const items = this.props.items;

    return (
      <div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
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

  public componentDidUpdate(previousProps: any, previousState: IJobsListState) {
    if (
      previousState.isModalSelection !== this.state.isModalSelection &&
      !this.state.isModalSelection
    ) {
      this._selection.setAllSelected(false);
    }
  }

  private _onChangeCompactMode = (
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean,
  ): void => {
    this.setState({ isCompactMode: checked });
  };

  private _onChangeModalSelection = (
    ev: React.MouseEvent<HTMLElement>,
    checked: boolean,
  ): void => {
    this.setState({ isModalSelection: checked });
  };

  private _onChangeText = (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    text: string,
  ): void => {
    this.setState({
      items: text
        ? this._allItems.filter(i => i.Name.toLowerCase().indexOf(text) > -1)
        : this._allItems,
    });
  };

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
          (this._selection.getSelection()[0] as IJobModel).Name
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
const noOp = () => undefined;

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
