import React, { Component } from 'react';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsRowProps,
  DetailsRow,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { ITaskModel } from '../../models/ITaskModel';
import Moment from 'moment';
import { Checkbox } from 'office-ui-fabric-react/lib/components/Checkbox';

export interface ITaskListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export interface IDocument {
  Subject: string;
  Type: string;
  ModifiedOn?: string;
  DueDate?: string;
  Priority?: string;
  ActualEnd?: string;
  complete?: boolean;
}

interface IProps {
  tasks?: ITaskModel[];
  onSelectRow?: (row: string) => void;
}

export class TaskList extends Component<IProps, ITaskListState> {
  private _selection: Selection;
  setCurrentTask: string;
  state: {
    items: IDocument[];
    columns: IColumn[];
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    tasks?: ITaskModel[];
  };

  constructor(props: IProps) {
    super(props);
    const { tasks } = props;
    const _columns: IColumn[] = [
      {
        key: 'column1',
        name: '',
        iconName: 'Checkbox',
        fieldName: 'complete',
        minWidth: 12,
        maxWidth: 12,
        isRowHeader: true,
        isResizable: false,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'boolean',
        isPadded: false,
        onRender: (item: IDocument) => {
          return (
            <div>
              <Checkbox
                checked={item.complete}
                ariaLabel={'Mark Task Complete'}
                styles={{
                  checkbox: {
                    height: 12,
                    width: 12,
                    padding: 0,
                    position: 'relative',
                    left: -5,
                  },
                }}
              />
            </div>
          );
        },
      },
      {
        key: 'column2',
        name: 'Subject',
        fieldName: 'Subject',
        minWidth: 20,
        maxWidth: 250,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column3',
        name: 'Job Task Type',
        fieldName: 'Type',
        minWidth: 100,
        maxWidth: 140,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column4',
        name: 'Priority',
        fieldName: 'Priority',
        minWidth: 55,
        maxWidth: 60,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column5',
        name: 'Due Date',
        fieldName: 'DueDate',
        minWidth: 65,
        maxWidth: 100,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'column6',
        name: 'Actual End',
        fieldName: 'DueDate',
        minWidth: 65,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        console.log('HERRERER');
        const details = this._getSelectionDetails();
        this.setState({
          selectionDetails: details,
        });
      },
    });

    this.state = {
      items: [] as IDocument[],
      columns: _columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: true,
      tasks: tasks,
    };
  }

  public _onClick = (x: any): any => {
    const { onSelectRow } = this.props;
    return onSelectRow(x as any);
  };

  public render() {
    const {
      columns,
      items,
      isCompactMode,
      selectionDetails,
      isModalSelection,
    } = this.state;
    const { tasks } = this.props;
    const rows = _generateDocuments(tasks);
    return (
      <div className="list-container">
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            styles={{
              root: {
                display: 'flex',
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: '90%',
                height: 'auto',
                minHeight: '40vh',
              },
            }}
            items={rows}
            compact={isCompactMode}
            columns={columns}
            enableShimmer={true}
            selectionMode={
              isModalSelection ? SelectionMode.multiple : SelectionMode.none
            }
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            onRenderRow={row => {
              return (
                <div onClick={() => this._onClick(row.item.taskId)}>
                  <DetailsRow {...row} />
                </div>
              );
            }}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </div>
    );
  }

  public componentDidUpdate(previousProps: any, previousState: ITaskListState) {
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
          (this._selection.getSelection()[0] as IDocument).Subject
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

function _generateDocuments(tasks: ITaskModel[]) {
  //console.log('tasks', tasks);
  const items: IDocument[] = [];
  const rows = tasks ? tasks : [];
  rows.map((task: ITaskModel) => {
    const taskId = task ? task.Id : null;
    const taskType = task && task.Type ? task.Type.Name : '–';
    const priority = task && task.Priority ? task.Priority.Name : '–';
    const fileName = task.Subject ? task.Subject : '–';
    const modifiedOn = task ? Moment(task.ModifiedOn).format('l') : '–';
    const dueDate = task ? Moment(task.DueDate).format('l') : '–';
    const complete =
      task && task.StatusReason ? task.StatusReason.Label !== 'Open' : false;
    let userName = '[PLACEHOLDER]';
    items.push({
      complete: complete,
      Subject: fileName,
      Type: taskType,
      ModifiedOn: modifiedOn,
      DueDate: dueDate,
      Priority: priority,
    });
  });
  return items;
}
