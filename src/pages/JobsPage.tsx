/**
 * Jobs Page
 * @description "Sepire Jobs"
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import '../styles/main.scss';
import '../styles/jobs.scss';
import React, { MouseEvent, ChangeEvent } from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Moment from 'moment';

import { ApplicationState, reducers } from '../store/index';
import { IJobModel } from '../models/IJobModel';
import * as JobStore from '../store/JobStore';
import AppComponent from '../components/shared/AppComponent';
import AppBreadcrumb from '../components/shared/AppBreadcrumb';
import Loader from '../components/shared/Loader';
import { ModalComponent } from '../components/shared/ModalComponent';
import { PagingBar } from '../components/shared/PagingBar';
import JobActions from '../components/jobs/JobActions';
import JobListFilter from '../components/jobs/JobListFilter';
import JobList from '../components/jobs/JobList';
import { Checkbox } from 'office-ui-fabric-react';

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
  private elModalDelete: ModalComponent;

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
  onClickAddJob(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log('onClickAddJob', e);
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
  onClickJobEditorDelete__saveBtn(e: MouseEvent<HTMLButtonElement>): void {
    this.props.deleteRequest(this.state.modelForEdit.Id);
    this.elModalDelete.hide();
  }

  @bind
  onChangeSearchInput(e: ChangeEvent<HTMLInputElement>) {
    var val = e.currentTarget.value;
    this.fetch(val);
    this.pagingBar.setFirstPage();
  }

  @bind
  onClickShowJobTypeFilter(e: MouseEvent<HTMLButtonElement>) {
    var val = e.currentTarget.value;
    this.filterByJobType(val);
  }

  @bind
  onClickShowJobStatusFilter(e: MouseEvent<HTMLButtonElement>) {
    var val = e.currentTarget.value;
    this.filterByJobStatus(val);
  }

  @bind
  filterByJobType(type: string) {
    console.log('filterByJobType', type);
    return true;
  }

  @bind
  filterByJobStatus(type: string) {
    console.log('filterByJobStatus', type);
    return true;
  }

  @bind
  selectAll(e: MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    console.log('selectAll', e);
  }

  render() {
    if (!this.props.jobs) return false;
    const jobscount = this.props.jobs.length || 0;
    const pageCount = jobscount / this.state.limitPerPage;
    let pageItems = this.props.jobs.length
      ? this.props.jobs.slice(
          this.state.rowOffset,
          this.state.rowOffset + this.state.limitPerPage,
        )
      : [];
    return (
      <div className="jobs-page">
        <AppBreadcrumb show={true} />
        <Loader show={this.props.indicators.operationLoading} />
        <div className="list-header">
          <h1>Jobs</h1>
        </div>
        <JobListFilter
          onClickAddJob={this.onClickAddJob}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickShowJobTypeFilter={this.onClickShowJobTypeFilter}
          onClickShowJobStatusFilter={this.onClickShowJobStatusFilter}
        />
        <div className="job-list">
          <JobList items={pageItems} />
          <div className="job-paginator">
            <PagingBar
              ref={x => (this.pagingBar = x)}
              totalPages={pageCount}
              limitPerPage={this.state.limitPerPage}
              currentPage={this.state.pageNum}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
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
          title={`Delete Job: #${this.state.modelForEdit.Id} ${
            this.state.modelForEdit.Name
          }`}
        >
          <p>Do you really want to delete this job?</p>
        </ModalComponent>
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.jobs,
  JobStore.actionCreators,
)(JobsPage as any);

export default (withRouter(component as any) as any) as typeof JobsPage;
