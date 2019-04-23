/**
 * Jobs Page
 *
 * @author Matthew Dunham <matthew.d@shoregrp.com>
 */

// TODO: Organize imports better
import '../styles/main.scss';
import React, { MouseEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import { initializeIcons } from '@uifabric/icons';
import { IJobModel } from '../models/IJobModel';
import * as JobStore from '../store/JobStore';
import { ApplicationState, reducers } from '../store/index';
import AppComponent from '../components/shared/AppComponent';
import { PagingBar } from '../components/shared/PagingBar';
import JobEditor from '../components/jobs/JobEditor';
import Loader from '../components/shared/Loader';
import { ModalComponent } from '../components/shared/ModalComponent';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { getPromiseFromAction } from '../Utils';
import Moment from 'moment';
import {
  PrimaryButton,
  IconButton,
  // Older api
  Button,
  ButtonType,
} from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import JobActions from '../components/jobs/JobActions';

type Props = RouteComponentProps<{}> &
  typeof JobStore.actionCreators &
  JobStore.IState;

interface IState {
  searchTerm: string;
  pageNum: number;
  limitPerPage: number;
  rowOffset: number;
  modelForEdit: IJobModel;
  jobs?: IJobModel[];
}

class JobsPage extends AppComponent<Props, IState> {
  private pagingBar: PagingBar;

  private elModalAdd: ModalComponent;
  private elModalEdit: ModalComponent;
  private elModalDelete: ModalComponent;

  private jobEditorAdd: JobEditor;
  private jobEditorEdit: JobEditor;

  private fetch: (id: string) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      searchTerm: '',
      pageNum: 1,
      limitPerPage: 10,
      rowOffset: 0,
      modelForEdit: {},
    };

    this.fetch = AwesomeDebouncePromise((id: string) => {
      props.fetchRequest(id);
    }, 500);
  }

  componentWillMount() {
    this.props.fetchRequest();
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
  onClickShowAddModal(e: MouseEvent<HTMLButtonElement>) {
    this.elModalAdd.show();
  }

  @bind
  onClickShowEditModal(
    e: MouseEvent<HTMLButtonElement>,
    modelForEdit: IJobModel,
  ) {
    this.setState({ modelForEdit });
    this.elModalEdit.show();
  }

  @bind
  onClickShowDeleteModal(
    e: MouseEvent<HTMLButtonElement>,
    modelForEdit: IJobModel,
  ) {
    this.setState({ modelForEdit });
    this.elModalDelete.show();
  }

  @bind
  async onClickJobEditorAdd__saveBtn(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!this.jobEditorAdd.elForm.isValid()) {
      // Form is not valid.
      return;
    }

    var result = await getPromiseFromAction(
      this.props.addRequest(this.jobEditorAdd.elForm.getData()),
    );

    if (result) {
      this.pagingBar.setLastPage();
      this.elModalAdd.hide();
    }
  }

  @bind
  async onClickJobEditorEdit__saveBtn(e: MouseEvent<HTMLButtonElement>) {
    if (!this.jobEditorEdit.elForm.isValid()) {
      // Form is not valid.
      return;
    }

    var data = this.jobEditorEdit.elForm.getData();

    var result = await getPromiseFromAction(this.props.updateRequest(data));

    if (result) {
      this.elModalEdit.hide();
    }
  }

  @bind
  onClickJobEditorDelete__saveBtn(e: MouseEvent<HTMLButtonElement>): void {
    this.props.deleteRequest(this.state.modelForEdit.id);
    this.elModalDelete.hide();
  }

  @bind
  renderRow(job: IJobModel) {
    let createdDate = Moment(job['CreatedOn']).format('MMMM Do YYYY');
    let jobType = job['Type'] ? job['Type']['Name'] : 'n/a';
    let jobId = job['Id'];
    return (
      <tr key={jobId}>
        <td>
          <Link
            data-automation-id="test"
            onClick={() => this.onClickShowEditModal(jobId, jobId)}
          >
            {job['Name']}
          </Link>
        </td>
        <td>{job['Description']}</td>
        <td className="nobr">{jobType}</td>
        <td className="nobr">{job['StatusReason']['Label']}</td>
        <td className="nobr right">{createdDate}</td>
        <td className="btn-actions nobr right">
          <JobActions />
        </td>
      </tr>
    );
  }

  @bind
  renderRows(data: IJobModel[]) {
    if (Object.keys(data).length === 0) return false;
    return data
      .slice(
        this.state.rowOffset,
        this.state.rowOffset + this.state.limitPerPage,
      )
      .map(x => this.renderRow(x));
  }

  @bind
  onChangeSearchInput(e: ChangeEvent<HTMLInputElement>) {
    var val = e.currentTarget.value;
    this.fetch(val);
    this.pagingBar.setFirstPage();
  }

  render() {
    if (!this.props.jobs) return false;
    return (
      <div className="jobs-page">
        <Loader show={this.props.indicators.operationLoading} />

        <div className="panel panel-default">
          <div className="panel-body row">
            <div className="col-sm-1">
              <Button
                buttonType={ButtonType.primary}
                onClick={this.onClickShowAddModal}
              >
                Add
              </Button>
            </div>
            <div className="col-sm-11">
              <input
                type="text"
                className="form-control"
                defaultValue={''}
                onChange={this.onChangeSearchInput}
                placeholder={'Search jobs...'}
              />
            </div>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Description</th>
              <th>Type</th>
              <th className={'text-center'}>Status</th>
              <th className={'text-center'}>Created Date</th>
              <th className={'text-center'}>Actions</th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.props.jobs)}</tbody>
        </table>

        {/* Add modal */}
        <ModalComponent
          ref={x => (this.elModalAdd = x)}
          buttons={
            <div>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClickJobEditorAdd__saveBtn}
              >
                Save
              </button>
            </div>
          }
          title="Create a Job"
          onHide={() => {
            if (this.jobEditorAdd) {
              this.jobEditorAdd.emptyForm();
            }
          }}
        >
          <JobEditor ref={x => (this.jobEditorAdd = x)} data={{}} />
        </ModalComponent>

        {/* Edit modal */}
        <ModalComponent
          ref={x => (this.elModalEdit = x)}
          buttons={
            <div>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onClickJobEditorEdit__saveBtn}
              >
                Save
              </button>
            </div>
          }
          title={`Edit Job: ${this.state.modelForEdit.name}`}
          onHide={() => {
            if (this.jobEditorEdit) {
              this.setState({ modelForEdit: {} });
            }
          }}
        >
          <JobEditor
            ref={x => (this.jobEditorEdit = x)}
            data={this.state.modelForEdit}
          />
        </ModalComponent>

        {/* Delete modal */}
        <ModalComponent
          ref={x => (this.elModalDelete = x)}
          buttons={
            <div>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={'btn btn-danger'}
                onClick={this.onClickJobEditorDelete__saveBtn}
              >
                Delete
              </button>
            </div>
          }
          title={`Delete Job: #${this.state.modelForEdit.id} ${
            this.state.modelForEdit.name
          }`}
        >
          <p>Do you really want to delete this job?</p>
        </ModalComponent>

        <PagingBar
          ref={x => (this.pagingBar = x)}
          totalResults={this.props.jobs.length}
          limitPerPage={this.state.limitPerPage}
          currentPage={this.state.pageNum}
          onChangePage={this.onChangePage}
        />
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.jobs,
  JobStore.actionCreators,
)(JobsPage as any);

export default (withRouter(component as any) as any) as typeof JobsPage;
