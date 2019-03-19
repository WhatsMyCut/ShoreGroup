/**
 * Jobs Page
 * 
 * @author Matthew Dunham <matthew.d@shoregrp.com>
 */

 // TODO: Organize imports better
import "../styles/main.scss";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ITaskModel } from "../models/ITaskModel";
import * as TaskStore from "../store/TaskStore";
import { ApplicationState, reducers } from "../store/index";
import { connect } from "react-redux";
import { PagingBar } from "../components/shared/PagingBar";
import TaskEditor from "../components/tasks/TaskEditor";
import Loader from "../components/shared/Loader";
import bind from 'bind-decorator';
import { ModalComponent } from "../components/shared/ModalComponent";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { getPromiseFromAction } from "../Utils";

type Props = RouteComponentProps<{}> & typeof TaskStore.actionCreators & TaskStore.IState;

interface IState {
  searchTerm: string;
  pageNum: number;
  limitPerPage: number;
  rowOffset: number;
  modelForEdit: ITaskModel;
}

class JobsPage extends React.Component<Props, IState> {

  private pagingBar: PagingBar;
  
  private elModalAdd: ModalComponent;
  private elModalEdit: ModalComponent;
  private elModalDelete: ModalComponent;

  private tasksEditorAdd: TaskEditor;
  private tasksEditorEdit: TaskEditor;

  private debouncedSearch: (term: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: "",
      pageNum: 1,
      limitPerPage: 10,
      rowOffset: 0,
      modelForEdit: {}
    };

    this.debouncedSearch = AwesomeDebouncePromise((term: string) => {
      props.searchRequest(term);
    }, 500);
  }

  componentWillMount() {
    this.props.searchRequest();
  }

  componentWillUnmount() {
    if (this.elModalAdd) {
      this.elModalAdd.hide();
    }
    if (this.elModalEdit) {
      this.elModalEdit.hide();
    }
    if (this.elModalDelete) {
      this.elModalDelete.hide();
    }
  }

  @bind
  onChangePage(pageNum: number): void {
    let rowOffset = Math.ceil((pageNum - 1) * this.state.limitPerPage);
    this.setState({ pageNum, rowOffset });
  }

  @bind
  onClickShowAddModal(e: React.MouseEvent<HTMLButtonElement>) {
    this.elModalAdd.show();
  }

  @bind
  onClickShowEditModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: ITaskModel) {
    this.setState({ modelForEdit });
    this.elModalEdit.show();
  }

  @bind
  onClickShowDeleteModal(e: React.MouseEvent<HTMLButtonElement>, modelForEdit: ITaskModel) {
    this.setState({ modelForEdit });
    this.elModalDelete.show();
  }

  @bind
  async onClickTaskEditorAdd__saveBtn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!this.tasksEditorAdd.elForm.isValid()) {
      // Form is not valid.
      return;
    }

    var result =
      await getPromiseFromAction(
        this.props.addRequest(this.tasksEditorAdd.elForm.getData())
      );

    if (result) {
      this.pagingBar.setLastPage();
      this.elModalAdd.hide();
    }
  }

  @bind
  async onClickTaskEditorEdit__saveBtn(e: React.MouseEvent<HTMLButtonElement>) {
    if (!this.tasksEditorEdit.elForm.isValid()) {
      // Form is not valid.
      return;
    }

    var data = this.tasksEditorEdit.elForm.getData();

    var result = await getPromiseFromAction(
      this.props.updateRequest(data)
    );

    if (result) {
      this.elModalEdit.hide();
    }
  }

  @bind
  onClickTaskEditorDelete__saveBtn(e: React.MouseEvent<HTMLButtonElement>): void {
    this.props.deleteRequest(this.state.modelForEdit.taskID);
    this.elModalDelete.hide();
  }

  @bind
  renderRow(task: ITaskModel) {
    return <tr key={task.taskID}>
      <td>{task.name}</td>
      <td>{task.description}</td>
      <td className="btn-actions">
        <button className="btn btn-info" onClick={x => this.onClickShowEditModal(x, task)}>Edit</button>&nbsp;
                <button className="btn btn-danger" onClick={x => this.onClickShowDeleteModal(x, task)}>Delete</button>
      </td>
    </tr>;
  }

  @bind
  renderRows(data: ITaskModel[]) {
    return data
      .slice(this.state.rowOffset, this.state.rowOffset + this.state.limitPerPage)
      .map(x => this.renderRow(x));
  }

  @bind
  onChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    var val = e.currentTarget.value;
    this.debouncedSearch(val);
    this.pagingBar.setFirstPage();
  }

  render() {

    return <div>
      <Loader show={this.props.indicators.operationLoading} />

      <div className="panel panel-default">
        <div className="panel-body row">
          <div className="col-sm-1">
            <button className="btn btn-success" onClick={this.onClickShowAddModal}>Add</button>
          </div>
          <div className="col-sm-11">
            <input
              type="text"
              className="form-control"
              defaultValue={""}
              onChange={this.onChangeSearchInput}
              placeholder={"Search jobs..."}
            />
          </div>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Job Name</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows(this.props.tasks)}
        </tbody>
      </table>

      {/* Add modal */}
      <ModalComponent
        ref={x => this.elModalAdd = x}
        buttons={<div>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={this.onClickTaskEditorAdd__saveBtn}>Save</button>
        </div>}
        title="Create a Job"
        onHide={() => {
          if (this.tasksEditorAdd) {
            this.tasksEditorAdd.emptyForm();
          }
        }}>
        <TaskEditor ref={x => this.tasksEditorAdd = x} data={{}} />
      </ModalComponent>

      {/* Edit modal */}
      <ModalComponent
        ref={x => this.elModalEdit = x}
        buttons={<div>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={this.onClickTaskEditorEdit__saveBtn}>Save</button>
        </div>}
        title={`Edit Job: ${this.state.modelForEdit.name}`}
        onHide={() => {
          if (this.tasksEditorEdit) {
            this.setState({ modelForEdit: {} });
          }
        }}>
        <TaskEditor ref={x => this.tasksEditorEdit = x} data={this.state.modelForEdit} />
      </ModalComponent>

      {/* Delete modal */}
      <ModalComponent
        ref={x => this.elModalDelete = x}
        buttons={<div>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-danger" onClick={this.onClickTaskEditorDelete__saveBtn}>Delete</button>
        </div>}
        title={`Delete Job: #${this.state.modelForEdit.taskID} ${this.state.modelForEdit.name}`}>
        <p>Do you really want to delete this job?</p>
      </ModalComponent>

      <PagingBar
        ref={x => this.pagingBar = x}
        totalResults={this.props.tasks.length}
        limitPerPage={this.state.limitPerPage}
        currentPage={this.state.pageNum}
        onChangePage={this.onChangePage}
      />
    </div>;
  }
}

var component = connect(
  (state: ApplicationState) => state.tasks,
  TaskStore.actionCreators
)(JobsPage as any);

export default (withRouter(component as any) as any as typeof JobsPage)