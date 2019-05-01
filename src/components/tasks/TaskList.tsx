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

export interface ITaskListState {
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
}

export interface IDocument {
  name: string;
  value: string;
  taskId?: string;
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
    isModalSelection: false;
    isCompactMode: false;
    tasks?: ITaskModel[];
  };

  constructor(props: IProps) {
    super(props);
    const { tasks } = props;
    const _columns: IColumn[] = [
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
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        console.log('HERRERER');
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
      <div className="task-list-conttainer">
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={rows}
            compact={true}
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

function _generateDocuments(tasks: ITaskModel[]) {
  console.log('Mapping', tasks);
  const items: IDocument[] = [];
  const rows = tasks ? tasks : [];
  rows.map((task: ITaskModel) => {
    const taskId = task ? task.taskID : null;
    let fileName = task.name ? task.name : '–';
    let userName = '[PLACEHOLDER]';
    items.push({
      name: fileName,
      value: fileName,
    });
  });
  return items;
}
