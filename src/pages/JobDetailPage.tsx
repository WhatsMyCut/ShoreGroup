/**
 * Job Detail Page
 *
 * @author Mike Taylor <mike.taylor@shoregrp.com>
 */

import React, { MouseEvent, ChangeEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import bind from 'bind-decorator';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Moment from 'moment';

import AppComponent from '../components/shared/AppComponent';
import Loader from '../components/shared/Loader';
import { ApplicationState, reducers } from '../store/index';
import { IJobModel } from '../models/IJobModel';
import JobHeader from '../components/jobs/JobHeader';
import JobDetail from '../components/jobs/JobDetail';
import * as JobStore from '../store/JobStore';
type Props = RouteComponentProps<{}> &
  typeof JobStore.actionCreators &
  JobStore.IState;

interface IState {
  jobId: string;
  job: IJobModel;
}

class JobDetailPage extends AppComponent<Props, IState> {
  private fetch: (id: string) => void;

  constructor(props: Props) {
    super(props);
    this.fetch = AwesomeDebouncePromise((id: string) => {
      props.fetchRequest(id);
    }, 500);
  }

  componentDidMount() {
    console.log('here9', this.state, this.props);
  }

  componentWillMount() {
    const jobId = this.props.location.pathname.replace('/jobs', '');
    this.fetch(jobId);
  }

  render() {
    return (
      <div className="job-detail">
        <Loader show={this.props.indicators.operationLoading} />
        Job Details Page
        <JobHeader
          statusLabel={this.props.job.statusReason}
          owner={this.props.job.name}
        />
        <JobDetail />
      </div>
    );
  }
}

var component = connect(
  (state: ApplicationState) => state.job,
  JobStore.actionCreators,
)(JobDetailPage as any);

export default (withRouter(component as any) as any) as typeof JobDetailPage;
